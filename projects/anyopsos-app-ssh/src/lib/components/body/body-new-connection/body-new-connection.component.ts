import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Application, AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {Credential} from '@anyopsos/app-credentials-manager';

import {AnyOpsOSAppSshService} from '../../../services/anyopsos-app-ssh.service';
import {SshConnection} from '../../../types/ssh-connection';

@Component({
  selector: 'sassh-body-new-connection',
  templateUrl: './body-new-connection.component.html',
  styleUrls: ['./body-new-connection.component.scss']
})
export class BodyNewConnectionComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();
  private CredentialsManager;

  credentials: Credential[];
  connections: SshConnection[];
  connectionForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private Applications: AnyOpsOSLibApplicationService,
              private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private Modal: AnyOpsOSLibModalService,
              private Ssh: AnyOpsOSAppSshService) {

    this.CredentialsManager = this.serviceInjector.get('AnyOpsOSAppCredentialsManagerService');
    this.CredentialsManager.credentials.pipe(takeUntil(this.destroySubject$)).subscribe(credentials => this.credentials = credentials);
  }

  ngOnInit(): void {
    this.connectionForm = this.formBuilder.group({
      description: ['', Validators.required],
      host: ['', Validators.required],
      port: [22, Validators.required],
      credential: ['', Validators.required],
      hopServerUuid: [],
      save: [true],
      autologin: [false],
      uuid: [null]
    });

    this.Ssh.connections.pipe(takeUntil(this.destroySubject$)).subscribe(connections => {
      this.connections = connections;

      if (this.connections.length === 0) return this.connectionForm.controls.hopServerUuid.disable();
      this.connectionForm.controls.hopServerUuid.enable();
    });

    this.Ssh.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe((activeConnection: string) => {

      if (!activeConnection) {
        return this.connectionForm.reset({
          port: 22,
          save: true,
          autologin: false,
          hopServerUuid: null,
          uuid: null
        });
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

    this.Modal.openLittleModal('PLEASE WAIT', (saveOnly ? 'Saving connection...' : 'Connecting to server...'), '.window--ssh .window__main', 'plain').then(() => {
      this.Ssh.connect(this.connectionForm.value, saveOnly);
    });
  }

  manageCredentials(): void {
    this.Applications.openApplication('credentials-manager');
  }

  getActiveConnection(): SshConnection {
    return this.Ssh.getActiveConnection();
  }
}
