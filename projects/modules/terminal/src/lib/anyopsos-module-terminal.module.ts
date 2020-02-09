import {getSocketIO} from 'socket-controllers';
import {Readable, Writable} from 'stream';
import {ClientChannel} from 'ssh2';

import {AnyOpsOSTerminalSessionStateModule} from './anyopsos-module-terminal-session-state';
import {TerminalTypes} from './types/terminal-types';
import {TerminalMap} from './types/terminal-map';
import {Socket} from 'socket.io';

export class AnyOpsOSTerminalModule {

  private readonly TerminalSessionStateModule: AnyOpsOSTerminalSessionStateModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string,
              private readonly connectionUuid: string) {

    this.TerminalSessionStateModule = new AnyOpsOSTerminalSessionStateModule(this.userUuid, this.sessionUuid, this.workspaceUuid, this.connectionUuid);
  }

  /**
   * Create new Terminal
   */
  async createTerminal(socket: Socket, type: TerminalTypes): Promise<string> {
    const currentTerminal: TerminalMap = await this.TerminalSessionStateModule.createSession(type);

    socket.join('terminal-' + currentTerminal.terminalUuid);

    return currentTerminal.terminalUuid;
  }

  /**
   * Disconnects & Deletes a terminal
   */
  async deleteTerminal(terminalUuid: string, data?: any): Promise<void> {
    await this.TerminalSessionStateModule.disconnectSession(terminalUuid);
    this.terminalDisconnected(terminalUuid, data);
  }

  /**
   * Set Terminal Stream
   */
  setTerminalStream(terminalUuid: string, stream?: ClientChannel, stdout?: Writable, stdin?: Readable): void {
    const currentTerminal = this.TerminalSessionStateModule.getSessionByTerminalUuid(terminalUuid);

    if (stream) {
      currentTerminal.terminal.stream = stream;

      currentTerminal.terminal.stream.stderr.on('data', (chunk: Buffer | string) => this.terminalStout(terminalUuid, chunk.toString()));
      currentTerminal.terminal.stream.on('data', (data: Buffer | string) => this.terminalStout(terminalUuid, data.toString()));
      currentTerminal.terminal.stream.on('close', (code: number | null, signal: string) => this.deleteTerminal(terminalUuid, {code, signal}));
    }

    if (stdout) {
      currentTerminal.terminal.stdout = stdout;

      currentTerminal.terminal.stdout.on('close', (code: number | null, signal: string) => this.deleteTerminal(terminalUuid, {code, signal}));
    }

    if (stdin) {
      currentTerminal.terminal.stdin = stdin;
    }

  }

  /**
   * Set Terminal columns and rows
   */
  setTerminalGeometry(terminalUuid: string, cols: number, rows: number): void {

    const currentTerminal = this.TerminalSessionStateModule.getSessionByTerminalUuid(terminalUuid);

    currentTerminal.terminal.cols = cols;
    currentTerminal.terminal.rows = rows;

    if (currentTerminal.terminal.type === 'ssh') currentTerminal.terminal.stream?.setWindow(rows, cols, 0, 0);
  }

  getTerminalGeometry(terminalUuid: string): { cols: number; rows: number; } {
    const currentTerminal = this.TerminalSessionStateModule.getSessionByTerminalUuid(terminalUuid);

    return {
      cols: currentTerminal.terminal.cols,
      rows: currentTerminal.terminal.rows
    };
  }

  /**
   * Input from Client to stream
   */
  terminalStdin(terminalUuid: string, data: string): void {

    const currentTerminal = this.TerminalSessionStateModule.getSessionByTerminalUuid(terminalUuid);

    if (currentTerminal.terminal.type === 'container_logs' || currentTerminal.terminal.type === 'container_shell') {
      currentTerminal.terminal.stdin?.push(data, 'utf8');
    }

    if (currentTerminal.terminal.type === 'ssh') {
      currentTerminal.terminal.stream?.write(data);
    }
  }

  // Output stream data to Client
  terminalStout(terminalUuid: string, data: any): void {
    getSocketIO().to('terminal-' + terminalUuid).emit('[terminal-stdout]', { terminalUuid, data });
  }

  // Output disconnected to Client
  terminalDisconnected(terminalUuid: string, data?: any): void {
    getSocketIO().to('terminal-' + terminalUuid).emit('[terminal-disconnected]', { terminalUuid, data });
  }

}
