import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {Socket} from 'ngx-socket-io';
import {Terminal} from 'xterm';
import {FitAddon} from 'xterm-addon-fit';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'slterm-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnDestroy, AfterViewInit {
  @ViewChild('terminalRef') terminalRef: ElementRef;
  @Input() terminalType: 'container_logs'|'container_shell'|'ssh';
  @Input() terminalUuid: string;
  @Output() terminalUuidChange: EventEmitter<string> = new EventEmitter<string>();

  connected: boolean = false;
  cols: number = 80;
  rows: number = 24;

  term: Terminal;
  fitAddon: FitAddon = new FitAddon();

  constructor(private socket: Socket) {

    this.socket
      .fromEvent('[terminal-stdout]')
      .subscribe((sockData: { uuid: string, data: any }) => {

        if (sockData.uuid !== this.terminalUuid) return;

        this.term.write(sockData.data);
      });

  }

  ngOnDestroy(): void {
    this.term.dispose();

    this.socket.emit('[terminal-delete]', {
      uuid: this.terminalUuid
    });
  }

  ngAfterViewInit(): void {
    this.mountTerminal();
  }

  onBodyResize(): void {
    this.fitAddon.fit();
  }

  private mountTerminal() {
    this.term = new Terminal({
      convertEol: true,
      cursorBlink: true,
      fontFamily: '"Roboto Mono", "Courier New", "Courier", monospace',
      fontSize: 12,
      scrollback: 10000,
    });
    this.term.loadAddon(this.fitAddon);

    this.term.open(this.terminalRef.nativeElement);
    this.term.focus();
    this.fitAddon.fit();

    this.term.onData((data) => {
      this.socket.emit('[terminal-stdin]', {
        data,
        uuid: this.terminalUuid
      });
    });

    this.term.onResize((size: { cols: number, rows: number }) => {

      this.socket.emit('[terminal-geometry]', {
        cols: size.cols,
        rows: size.rows,
        uuid: this.terminalUuid
      });

      this.cols = size.cols;
      this.rows = size.rows;
    });

    // Create terminal reference on backend
    if (!this.terminalUuid) {
      this.createWebsocketTerminal();
    }
  }

  private createWebsocketTerminal() {
    this.socket.emit('[terminal-create]', this.terminalType, (terminalUuid: string) => {
      this.terminalUuid = terminalUuid;
      this.connected = true;

      // Emit new terminalUuid
      this.terminalUuidChange.emit(this.terminalUuid);
    });
  }
}
