import {Component, Input, OnInit, ViewChild, ElementRef, ViewEncapsulation, OnDestroy} from '@angular/core';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Socket} from 'ngx-socket-io';

import {Application} from '@sysos/lib-application';

import {SysosAppSshService} from '../services/sysos-app-ssh.service';
import {SshConnection} from '../types/ssh-connection';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'sassh-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  @ViewChild('terminalContainer') set content(content: ElementRef) {
    this.terminalContainer = content;
    this.loadTerm();
  }

  private terminalContainer: ElementRef;
  private destroySubject$: Subject<void> = new Subject();
  private currentTerminal;

  connections: SshConnection[];
  activeConnection: string;

  viewSide: boolean = true;

  constructor(private socket: Socket,
              private Ssh: SysosAppSshService) {
  }

  ngOnInit() {
    this.Ssh.connections.pipe(takeUntil(this.destroySubject$)).subscribe(connections => {
      this.connections = connections;
    });
    this.Ssh.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe(activeConnection => {
      this.activeConnection = activeConnection;
      setTimeout(() => this.loadTerm(), 0);
    });
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }

  setActiveConnection(connection: SshConnection): void {
    this.Ssh.setActiveConnection(connection.uuid);
  }

  getActiveConnection(): SshConnection {
    return this.Ssh.getActiveConnection();
  }

  loadTerm() {
    if (!this.activeConnection) return;
    if (this.getActiveConnection().state === 'disconnected') return;

    this.currentTerminal = this.Ssh.getSshTerminal(this.activeConnection);
    if (!this.currentTerminal) return;

    this.terminalContainer.nativeElement.innerHTML = '';
    this.currentTerminal.open(this.terminalContainer.nativeElement);
    this.currentTerminal.focus();
    this.currentTerminal.fitAddon.fit();
  }

  onBodyResize(): void {
    console.log('res');
    this.currentTerminal.fitAddon.fit();
  }

}
