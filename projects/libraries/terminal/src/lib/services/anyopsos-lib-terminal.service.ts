import {Injectable} from '@angular/core';

import {Socket} from 'ngx-socket-io';
import {Terminal as xtermTerminal} from 'xterm';
import {FitAddon} from 'xterm-addon-fit';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';

import {Terminal as TerminalData} from '../types/terminal';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibTerminalService {

  private terminals: TerminalData[] = [];

  constructor(private readonly socket: Socket,
              private readonly logger: AnyOpsOSLibLoggerService) {

    this.socket
      .fromEvent('[terminal-stdout]')
      .subscribe((sockData: { terminalUuid: string, data: any }) => {

        const currentTerminal: TerminalData = this.terminals[sockData.terminalUuid];
        if (currentTerminal) currentTerminal.terminal.write(sockData.data);
      });

    this.socket
      .fromEvent('[terminal-disconnected]')
      .subscribe((sockData: { terminalUuid: string, data: any }) => {

        const currentTerminal: TerminalData = this.terminals[sockData.terminalUuid];
        if (currentTerminal) currentTerminal.state = 'disconnected';
      });
  }

  createTerminal(workspaceUuid: string, connectionUuid: string, terminalUuid: string): TerminalData {
    this.terminals[terminalUuid] = {
      workspaceUuid,
      connectionUuid,
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
        workspaceUuid,
        connectionUuid,
        terminalUuid,
        data
      }, (resultData: BackendResponse) => {
        if (resultData.status === 'error') this.logger.error('LibTerminal', 'Error on [terminal-stdin]', null, resultData.data);
      });
    });

    this.terminals[terminalUuid].terminal.onResize((size: { cols: number, rows: number }) => {
      this.socket.emit('[terminal-geometry]', {
        workspaceUuid,
        connectionUuid,
        terminalUuid,
        cols: size.cols,
        rows: size.rows
      }, (resultData: BackendResponse) => {
        if (resultData.status === 'error') this.logger.error('LibTerminal', 'Error on [terminal-geometry]', null, resultData.data);
      });
    });

    this.terminals[terminalUuid].terminal.onTitleChange((data: string) => {
      console.log(data);
    });

    return this.terminals[terminalUuid];
  }

  deleteTerminal(terminalUuid: string): void {
    if (!this.terminals[terminalUuid]) return;

    this.terminals[terminalUuid].terminal.dispose();
    this.socket.emit('[terminal-delete]', {
      workspaceUuid: this.terminals[terminalUuid].workspaceUuid,
      connectionUuid: this.terminals[terminalUuid].connectionUuid,
      terminalUuid
    }, (resultData: BackendResponse) => {
      if (resultData.status === 'error') return this.logger.error('LibTerminal', 'Error on [terminal-delete]', null, resultData.data);

      this.terminals[terminalUuid] = undefined;
      delete this.terminals[terminalUuid];
    });
  }

  getTerminalByUuid(terminalUuid: string): TerminalData {
    return this.terminals[terminalUuid];
  }
}
