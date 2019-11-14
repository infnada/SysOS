import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {AnyOpsOSLibApplicationService, Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {Credential} from '@anyopsos/app-credentials-manager';

import {AnyOpsOSAppSftpService} from '../../services/anyopsos-app-sftp.service';
import {SftpConnection} from '../../types/sftp-connection';

@Component({
  selector: 'sasftp-body-new-connection',
  templateUrl: './body-new-connection.component.html',
  styleUrls: ['./body-new-connection.component.scss']
})
export class BodyNewConnectionComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();
  private CredentialsManager;

  credentials: Credential[];
  connectionForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private Applications: AnyOpsOSLibApplicationService,
              private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private Modal: AnyOpsOSLibModalService,
              private Sftp: AnyOpsOSAppSftpService) {

    this.CredentialsManager = this.serviceInjector.get('AnyOpsOSAppCredentialsManagerService');
    this.CredentialsManager.credentials.pipe(takeUntil(this.destroySubject$)).subscribe(credentials => this.credentials = credentials);
  }

  ngOnInit() {
    this.connectionForm = this.formBuilder.group({
      description: ['', Validators.required],
      host: ['', Validators.required],
      port: [22, Validators.required],
      credential: ['', [Validators.required]],
      hopping: [false],
      hophost: [''],
      hopport: [22],
      hopcredential: [''],
      save: [true],
      autologin: [false],
      uuid: [null]
    });

    // Dynamic input requirement
    const hophost = this.connectionForm.get('hophost');
    const hopport = this.connectionForm.get('hopport');
    const hopcredential = this.connectionForm.get('hopcredential');
    this.connectionForm.get('hopping').valueChanges
      .pipe(takeUntil(this.destroySubject$)).subscribe(hopping => {

        if (hopping) {
          hophost.setValidators([Validators.required]);
          hopport.setValidators([Validators.required]);
          hopcredential.setValidators([Validators.required]);
        } else {
          hophost.setValidators(null);
          hopport.setValidators(null);
          hopcredential.setValidators(null);
        }

        hophost.updateValueAndValidity();
        hopport.updateValueAndValidity();
        hopcredential.updateValueAndValidity();
      });

    this.Sftp.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe((activeConnection: string) => {

      if (!activeConnection) return;

      (this.connectionForm.controls.description as FormControl).setValue(this.getActiveConnection().description);
      (this.connectionForm.controls.host as FormControl).setValue(this.getActiveConnection().host);
      (this.connectionForm.controls.port as FormControl).setValue(this.getActiveConnection().port);
      (this.connectionForm.controls.credential as FormControl).setValue(this.getActiveConnection().credential);
      (this.connectionForm.controls.hopping as FormControl).setValue(this.getActiveConnection().hopping);
      (this.connectionForm.controls.hophost as FormControl).setValue(this.getActiveConnection().hophost);
      (this.connectionForm.controls.hopport as FormControl).setValue(this.getActiveConnection().hopport);
      (this.connectionForm.controls.hopcredential as FormControl).setValue(this.getActiveConnection().hopcredential);
      (this.connectionForm.controls.save as FormControl).setValue(this.getActiveConnection().save);
      (this.connectionForm.controls.autologin as FormControl).setValue(this.getActiveConnection().autologin);
      (this.connectionForm.controls.uuid as FormControl).setValue(this.getActiveConnection().uuid);
    });
  }

  ngOnDestroy() {
    this.connectionForm.reset();
    this.destroySubject$.next();
  }

  get f() { return this.connectionForm.controls; }

  sendConnect(saveOnly: boolean = false): void {
    // stop here if form is invalid
    if (this.connectionForm.invalid) return;

    this.Modal.openLittleModal('PLEASE WAIT', (saveOnly ? 'Saving connection...' : 'Connecting to server...'), '.window--sftp .window__main', 'plain').then(() => {
      this.Sftp.connect(this.connectionForm.value, saveOnly);
    });
  }

  manageCredentials() {
    this.Applications.openApplication('credentials-manager');
  }

  getActiveConnection(): SftpConnection {
    return this.Sftp.getActiveConnection();
  }
}
