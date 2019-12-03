import {Readable, Writable} from 'stream';
import uuid from 'uuid';

import {KubernetesSocketModule} from './kubernetes/kubernetes';

export interface Terminal {
  uuid: string;
  cols: number;
  rows: number;
  type: 'container_logs'|'container_shell'|'ssh';
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

      this.terminalStout({
        uuid: terminalUuid,
        data
      });
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
  deleteTerminal(data: { uuid: string; }): void {
    const currentTerminal = terminals.find(term => term.uuid === data.uuid);

    terminals.splice(
      terminals.findIndex((i) => {
          return i.uuid === data.uuid;
        }
      ), 1);

    if (currentTerminal && currentTerminal.type === 'container_logs') {

      // Prevent Circular Dependency
      const KubernetesSocket: KubernetesSocketModule = new KubernetesSocketModule(this.socket);
      KubernetesSocket.finishAllContainersLogRequestByTerminalUuid(data.uuid);
    }

    if (currentTerminal && currentTerminal.type === 'container_shell') {

      // Prevent Circular Dependency
      const KubernetesSocket: KubernetesSocketModule = new KubernetesSocketModule(this.socket);
      KubernetesSocket.finishTerminalShellRequest(data.uuid);
    }
  }

  // Set Terminal columns and rows
  setTerminalGeometry(data: { uuid: string; cols: number; rows: number; }): void {
    const currentTerminal = this.getTerminalByUuid(data.uuid);

    currentTerminal.cols = data.cols;
    currentTerminal.rows = data.rows;
  }

  // Input from Client to stream
  terminalStdin(data: { uuid: string; data: string; }): void {
    const currentTerminal = this.getTerminalByUuid(data.uuid);

    if (currentTerminal && currentTerminal.type === 'container_logs' || currentTerminal.type === 'container_shell') {
      currentTerminal.stdin.push(data.data, 'utf8');
    }
  }

  // Output stream data to Client
  terminalStout(data: { uuid: string; data: any }): void {
    this.socket.emit('[terminal-stdout]', data);
  }

}
