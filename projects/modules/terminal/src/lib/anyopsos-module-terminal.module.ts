import {Socket} from 'socket.io';
import {Readable, Writable} from 'stream';
import {ClientChannel} from 'ssh2';
import {v4 as uuid} from 'uuid';

import {AnyOpsOSKubernetesModule} from '@anyopsos/module-kubernetes';

import {TerminalTypes} from './types/terminal-types';
import {Terminal} from './types/terminal';
import {UserToSessionToTerminalMap} from './types/user-to-session-to-terminal-map';


const terminals: UserToSessionToTerminalMap = {};

export class AnyOpsOSTerminalModule {

  constructor(private readonly socket: Socket) {
  }

  getTerminalByUuid(userUuid: string, sessionUuid: string, terminalUuid: string): Terminal {
    return terminals[userUuid][sessionUuid][terminalUuid];
  }

  // Create new Terminal
  async createTerminal(userUuid: string, sessionUuid: string, type: TerminalTypes): Promise<string> {
    const id = await uuid();

    const emitData = (terminalUuid: string, data: string) => {
      if (!this.socket) return;

      this.terminalStout(terminalUuid, data);
    };

    const currentTerminal: Terminal = {
      uuid: id,
      cols: 80,
      rows: 24,
      type
    };

    // Generate Readable and Writable default streams
    if (type === 'container_logs' || type === 'container_shell') {
      currentTerminal.stdin = new Readable({
        read: () => {}
      });
      currentTerminal.stdout = new Writable({
        write(chunk: any, encoding: string, callback: () => void) {
          emitData(id, chunk.toString());
          callback();
        }
      });
    }

    if (!terminals[userUuid]) terminals[userUuid] = {};
    if (!terminals[userUuid][sessionUuid]) terminals[userUuid][sessionUuid] = {};
    terminals[userUuid][sessionUuid][id] = currentTerminal;

    return id;
  }

  // Delete terminal by terminalUuid
  deleteTerminal(userUuid: string, sessionUuid: string, terminalUuid: string): void {

    const currentTerminal: Terminal = this.getTerminalByUuid(userUuid, sessionUuid, terminalUuid);

    terminals[userUuid][sessionUuid][terminalUuid] = undefined;
    delete terminals[userUuid][sessionUuid][terminalUuid];

    if (currentTerminal && currentTerminal.type === 'container_logs') {

      // Prevent Circular Dependency
      const KubernetesSocket: AnyOpsOSKubernetesModule = new AnyOpsOSKubernetesModule(this.socket);
      KubernetesSocket.finishAllContainersLogRequestByTerminalUuid(userUuid, sessionUuid, terminalUuid);
      this.terminalDisconnected(terminalUuid, null);
    }

    if (currentTerminal && currentTerminal.type === 'container_shell') {

      // Prevent Circular Dependency
      const KubernetesSocket: AnyOpsOSKubernetesModule = new AnyOpsOSKubernetesModule(this.socket);
      KubernetesSocket.finishTerminalShellRequest(userUuid, sessionUuid, terminalUuid);
      this.terminalDisconnected(terminalUuid, null);
    }

    if (currentTerminal && currentTerminal.type === 'ssh') {
      currentTerminal.stream.end();
      this.terminalDisconnected(terminalUuid, null);
    }
  }

  // Set Terminal SSH stream
  setTerminalStream(userUuid: string, sessionUuid: string, terminalUuid: string, stream: ClientChannel): void {
    const currentTerminal = this.getTerminalByUuid(userUuid, sessionUuid, terminalUuid);

    currentTerminal.stream = stream;

    currentTerminal.stream.stderr.on('data', (chunk: Buffer | string) => this.terminalStout(terminalUuid, chunk.toString()));
    currentTerminal.stream.on('data', (data: Buffer | string) => this.terminalStout(terminalUuid, data.toString()));
    currentTerminal.stream.on('close', (code: number | null, signal: string) => this.terminalDisconnected(terminalUuid, {code, signal}));
  }

  // Set Terminal columns and rows
  setTerminalGeometry(userUuid: string, sessionUuid: string, data: { terminalUuid: string; cols: number; rows: number; }): void {

    const currentTerminal = this.getTerminalByUuid(userUuid, sessionUuid, data.terminalUuid);

    currentTerminal.cols = data.cols;
    currentTerminal.rows = data.rows;

    if (currentTerminal.type === 'ssh') currentTerminal.stream.setWindow(data.rows, data.cols, null, null);
  }

  // Input from Client to stream
  terminalStdin(userUuid: string, sessionUuid: string, data: { terminalUuid: string; data: string; }): void {

    const currentTerminal = this.getTerminalByUuid(userUuid, sessionUuid, data.terminalUuid);

    if (currentTerminal && currentTerminal.type === 'container_logs' || currentTerminal.type === 'container_shell') {
      currentTerminal.stdin.push(data.data, 'utf8');
    }

    if (currentTerminal && currentTerminal.type === 'ssh') {
      currentTerminal.stream.write(data.data);
    }
  }

  // Output stream data to Client
  terminalStout(terminalUuid: string, data: any): void {
    this.socket.emit('[terminal-stdout]', { terminalUuid, data });
  }

  // Output disconnected to Client
  terminalDisconnected(terminalUuid: string, data: any): void {
    this.socket.emit('[terminal-disconnected]', { terminalUuid, data });
  }

}
