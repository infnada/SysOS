import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {Socket} from 'ngx-socket-io';

import {AnyOpsOSLibTerminalService} from '../services/anyopsos-lib-terminal.service';
import {Terminal as TerminalData} from '../types/terminal';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'slterm-terminal[terminalType]',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild('terminalRef', {static: false}) terminalRef: ElementRef;
  @Input() terminalType: 'container_logs' | 'container_shell' | 'ssh';
  @Input() terminalUuid: string;
  @Input() customTerminalMessage: string = null;
  @Input() deleteOnDestroy: boolean = true;
  @Output() terminalUuidChange: EventEmitter<string> = new EventEmitter<string>();

  currentTerminal: TerminalData;

  constructor(private socket: Socket,
              private Terminal: AnyOpsOSLibTerminalService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.terminalUuid &&
      !changes.terminalUuid.firstChange &&
      changes.terminalUuid.previousValue &&
      changes.terminalUuid.previousValue !== changes.terminalUuid.currentValue
    ) {
      this.setTerminalReference();
    }
  }

  ngAfterViewInit(): void {
    this.setTerminalReference();
  }

  ngOnDestroy(): void {
    if (!this.deleteOnDestroy) return;

    this.Terminal.deleteTerminal(this.terminalUuid);
  }

  onBodyResize(): void {
    if (this.currentTerminal) this.currentTerminal.fitAddon.fit();
  }

  /**
   * Creates a new terminal if no terminalUuid is provided, or gets the reference tu the provided terminalUuid
   */
  private setTerminalReference(): void {

    // Create terminal reference on backend
    if (!this.terminalUuid) {
      return this.createWebsocketTerminal();
    }

    // Get already created terminal
    this.currentTerminal = this.Terminal.getTerminalByUuid(this.terminalUuid);
    this.mountTerminal();
  }

  /**
   * Creates new terminal at Backend
   */
  private createWebsocketTerminal(): void {
    this.socket.emit('[terminal-create]', this.terminalType, (terminalUuid: string) => {
      this.terminalUuid = terminalUuid;
      this.currentTerminal = this.Terminal.createTerminal(terminalUuid);
      this.mountTerminal();

      // Emit new terminalUuid
      this.terminalUuidChange.emit(this.terminalUuid);
    });
  }

  /**
   * Shows the terminal
   */
  private mountTerminal(): void {
    this.terminalRef.nativeElement.innerHTML = '';
    this.currentTerminal.terminal.open(this.terminalRef.nativeElement);
    this.currentTerminal.terminal.focus();
    this.currentTerminal.fitAddon.fit();
  }
}
