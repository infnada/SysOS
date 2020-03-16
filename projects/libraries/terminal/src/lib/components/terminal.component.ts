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

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibWorkspaceService} from '@anyopsos/lib-workspace';
import {TerminalTypes} from '@anyopsos/module-terminal';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';

import {AnyOpsOSLibTerminalService} from '../services/anyopsos-lib-terminal.service';
import {Terminal as TerminalData} from '../types/terminal';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'alterm-terminal[terminalType]',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild('terminalRef', {static: false}) terminalRef: ElementRef;
  @Input() private readonly connectionUuid: string;
  @Input() private readonly workspaceUuid: string = this.LibWorkspace.getCurrentWorkspaceUuid();
  @Input() private readonly terminalType: TerminalTypes = 'ssh';
  @Input() private readonly deleteOnDestroy: boolean = true;
  @Input() private terminalUuid: string;
  @Input() customTerminalMessage: string = null;
  @Output() private terminalUuidChange: EventEmitter<string> = new EventEmitter<string>();

  currentTerminal: TerminalData;

  constructor(private readonly socket: Socket,
              private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibWorkspace: AnyOpsOSLibWorkspaceService,
              private readonly Terminal: AnyOpsOSLibTerminalService) {

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
    this.socket.emit('[terminal-create]', {
      connectionUuid: this.connectionUuid,
      workspaceUuid: this.workspaceUuid,
      terminalType: this.terminalType
    }, (resultData: BackendResponse) => {
      if (resultData.status === 'error') {
        this.logger.error('LibTerminal', 'Unable to create websocket terminal', null, resultData.data);
        return this.customTerminalMessage = resultData.data;
      }

      this.terminalUuid = resultData.data;
      this.currentTerminal = this.Terminal.createTerminal(this.workspaceUuid, this.connectionUuid, resultData.data);
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
