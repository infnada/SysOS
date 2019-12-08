import {Injectable} from '@angular/core';

import {Socket} from 'ngx-socket-io';
import {Terminal as xtermTerminal} from 'xterm';
import {FitAddon} from 'xterm-addon-fit';

import {Terminal as TerminalData} from '../types/terminal';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibTerminalService {

  private terminals: TerminalData[] = [];

  constructor(private socket: Socket) {
    this.socket
      .fromEvent('[terminal-stdout]')
      .subscribe((sockData: { uuid: string, data: any }) => {

        const currentTerminal = this.terminals[sockData.uuid];
        if (currentTerminal) currentTerminal.terminal.write(sockData.data);
      });

    this.socket
      .fromEvent('[terminal-disconnected]')
      .subscribe((sockData: { uuid: string, data: any }) => {

        const currentTerminal = this.terminals[sockData.uuid];
        if (currentTerminal) currentTerminal.state = 'disconnected';
      });
  }

  createTerminal(terminalUuid: string): TerminalData {
    this.terminals[terminalUuid] = {
      fitAddon: new FitAddon(),
      terminal: new xtermTerminal({
        convertEol: true,
        cursorBlink: true,
        fontFamily: '"Roboto Mono", "Courier New", "Courier", monospace',
        fontSize: 12,
        scrollback: 10000,
      }),
      state: 'connected'
    };

    this.terminals[terminalUuid].terminal.loadAddon(this.terminals[terminalUuid].fitAddon);

    this.terminals[terminalUuid].terminal.onData((data) => {
      this.socket.emit('[terminal-stdin]', {
        data,
        uuid: terminalUuid
      });
    });

    this.terminals[terminalUuid].terminal.onResize((size: { cols: number, rows: number }) => {
      this.socket.emit('[terminal-geometry]', {
        cols: size.cols,
        rows: size.rows,
        uuid: terminalUuid
      }, (e) => {
        console.log(e);
      });
    });

    this.terminals[terminalUuid].terminal.onTitleChange((data: unknown) => {
      console.log(data);
    });

    return this.terminals[terminalUuid];
  }

  deleteTerminal(terminalUuid: string): void {
    if (!this.terminals[terminalUuid]) return;

    this.terminals[terminalUuid].terminal.dispose();
    this.socket.emit('[terminal-delete]', {
      uuid: terminalUuid
    });

    this.terminals[terminalUuid] = undefined;
  }

  getTerminalByUuid(terminalUuid: string): TerminalData {
    return this.terminals[terminalUuid];
  }
}
