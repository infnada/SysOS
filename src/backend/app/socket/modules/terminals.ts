import {Readable, Writable} from 'stream';
import {ClientChannel} from 'ssh2';
import uuid from 'uuid';

import {KubernetesSocketModule} from './kubernetes/kubernetes';

export interface Terminal {
  uuid: string;
  cols: number;
  rows: number;
  type: 'container_logs'|'container_shell'|'ssh';
  stream?: ClientChannel;
  stdin?: Readable;
  stdout?: Writable;
}

const terminals: Terminal[] = [];

export class TerminalsModule {

  constructor(private socket) {

  }

  getTerminalByUuid(terminalUuid: string) {
    return terminals.find((terminal) => terminal.uuid === terminalUuid);
  }

  // Create new Terminal
  async createTerminal(type: 'container_logs'|'container_shell'|'ssh'): Promise<string> {
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

    terminals.push(currentTerminal);

    return id;
  }

  // Delete terminal by uuid
  deleteTerminal(data: { uuid: string; }): Promise<void> {

    return new Promise(resolve => {
      const currentTerminal = this.getTerminalByUuid(data.uuid);

      terminals.splice(
        terminals.findIndex((i) => {
            return i.uuid === data.uuid;
          }
        ), 1);

      if (currentTerminal && currentTerminal.type === 'container_logs') {

        // Prevent Circular Dependency
        const KubernetesSocket: KubernetesSocketModule = new KubernetesSocketModule(this.socket);
        KubernetesSocket.finishAllContainersLogRequestByTerminalUuid(data.uuid).then(() => this.terminalDisconnected(data.uuid, null));
      }

      if (currentTerminal && currentTerminal.type === 'container_shell') {

        // Prevent Circular Dependency
        const KubernetesSocket: KubernetesSocketModule = new KubernetesSocketModule(this.socket);
        KubernetesSocket.finishTerminalShellRequest(data.uuid).then(() => this.terminalDisconnected(data.uuid, null));
      }

      if (currentTerminal && currentTerminal.type === 'ssh') {
        currentTerminal.stream.end();
        this.terminalDisconnected(data.uuid, null);
      }

      return resolve();
    });
  }

  // Set Terminal SSH stream
  setTerminalStream(terminalUuid: string, stream: ClientChannel): void {
    const currentTerminal = this.getTerminalByUuid(terminalUuid);

    currentTerminal.stream = stream;

    currentTerminal.stream.stderr.on('data', (chunk: Buffer | string) => this.terminalStout(terminalUuid, chunk.toString()));
    currentTerminal.stream.on('data', (data: Buffer | string) => this.terminalStout(terminalUuid, data.toString()));
    currentTerminal.stream.on('close', (code: number | null, signal: string) => this.terminalDisconnected(terminalUuid, {code, signal}));
  }

  // Set Terminal columns and rows
  setTerminalGeometry(data: { uuid: string; cols: number; rows: number; }): Promise<void> {

    return new Promise(resolve => {
      const currentTerminal = this.getTerminalByUuid(data.uuid);

      currentTerminal.cols = data.cols;
      currentTerminal.rows = data.rows;

      if (currentTerminal.type === 'ssh') currentTerminal.stream.setWindow(data.rows, data.cols, null, null);

      return resolve();
    });
  }

  // Input from Client to stream
  terminalStdin(data: { uuid: string; data: string; }): Promise<void> {

    return new Promise(resolve => {
      const currentTerminal = this.getTerminalByUuid(data.uuid);

      if (currentTerminal && currentTerminal.type === 'container_logs' || currentTerminal.type === 'container_shell') {
        currentTerminal.stdin.push(data.data, 'utf8');
      }

      if (currentTerminal && currentTerminal.type === 'ssh') {
        currentTerminal.stream.write(data.data);
      }

      return resolve();
    });

  }

  // Output stream data to Client
  terminalStout(terminalUuid: string, data: any): void {
    this.socket.emit('[terminal-stdout]', {uuid: terminalUuid, data});
  }

  // Output disconnected to Client
  terminalDisconnected(terminalUuid: string, data: any): void {
    this.socket.emit('[terminal-disconnected]', {uuid: terminalUuid, data});
  }

}
