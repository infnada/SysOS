import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {AnyOpsOSLibApplicationService, Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {Credential} from '@anyopsos/app-credentials-manager';
import {SshConnection} from '@anyopsos/app-ssh';

import {AnyOpsOSAppSftpService} from '../../../services/anyopsos-app-sftp.service';
import {SftpConnection} from '../../../types/sftp-connection';

@Component({
  selector: 'sasftp-body-new-connection',
  templateUrl: './body-new-connection.component.html',
  styleUrls: ['./body-new-connection.component.scss']
})
export class BodyNewConnectionComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();
  private CredentialsManager;
  private Ssh;

  credentials: Credential[];
  sshConnections: SshConnection[];
  connectionForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private Applications: AnyOpsOSLibApplicationService,
              private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private Modal: AnyOpsOSLibModalService,
              private Sftp: AnyOpsOSAppSftpService) {

    this.CredentialsManager = this.serviceInjector.get('AnyOpsOSAppCredentialsManagerService');
    this.Ssh = this.serviceInjector.get('AnyOpsOSAppSshService');
    this.CredentialsManager.credentials.pipe(takeUntil(this.destroySubject$)).subscribe(credentials => this.credentials = credentials);
  }

  ngOnInit(): void {
    this.connectionForm = this.formBuilder.group({
      description: ['', Validators.required],
      host: ['', Validators.required],
      port: [22, Validators.required],
      credential: ['', Validators.required],
      hopServerUuid: [null],
      save: [true],
      autologin: [false],
      uuid: [null]
    });

    this.Ssh.connections.pipe(takeUntil(this.destroySubject$)).subscribe(connections => {
      this.sshConnections = connections;

      if (this.sshConnections.length === 0) return this.connectionForm.controls.hopServerUuid.disable();
      this.connectionForm.controls.hopServerUuid.enable();
    });

    this.Sftp.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe((activeConnection: string) => {

      if (!activeConnection) {
        this.connectionForm.reset({
          port: 22,
          save: true,
          autologin: false,
          hopServerUuid: null,
          uuid: null
        });
        return;
      }

      // Set Form controls with currentConnection data
      const currentConnection = this.getActiveConnection();
      Object.keys(currentConnection).forEach((item) => {
        if (this.connectionForm.controls[item]) this.connectionForm.controls[item].setValue(currentConnection[item]);
      });
    });
  }

  ngOnDestroy(): void {
    this.connectionForm.reset();
    this.destroySubject$.next();
  }

  get f(): { [key: string]: AbstractControl } { return this.connectionForm.controls; }

  sendConnect(saveOnly: boolean = false): void {
    // stop here if form is invalid
    if (this.connectionForm.invalid) return;

    this.Modal.openLittleModal('PLEASE WAIT', (saveOnly ? 'Saving connection...' : 'Connecting to server...'), '.window--sftp .window__main', 'plain').then(() => {
      this.Sftp.connect(this.connectionForm.value, saveOnly);
    });
  }

  manageCredentials(): void {
    this.Applications.openApplication('credentials-manager');
  }

  manageSshConnections(): void {
    this.Applications.openApplication('ssh');
  }

  getActiveConnection(): SftpConnection {
    return this.Sftp.getActiveConnection();
  }
}
