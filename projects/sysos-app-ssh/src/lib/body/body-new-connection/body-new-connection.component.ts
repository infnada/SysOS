import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Application, SysosLibApplicationService} from '@sysos/lib-application';
import {SysosLibServiceInjectorService} from '@sysos/lib-service-injector';
import {Credential} from '@sysos/app-credentials-manager';

import {SysosAppSshService} from '../../services/sysos-app-ssh.service';
import {SshConnection} from '../../types/ssh-connection';

@Component({
  selector: 'sassh-body-new-connection',
  templateUrl: './body-new-connection.component.html',
  styleUrls: ['./body-new-connection.component.scss']
})
export class BodyNewConnectionComponent implements OnInit {
  @Input() application: Application;

  private CredentialsManager;

  credentials: Credential[];
  connectionForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private Applications: SysosLibApplicationService,
              private serviceInjector: SysosLibServiceInjectorService,
              private Ssh: SysosAppSshService) {

    this.CredentialsManager = this.serviceInjector.get('SysosAppCredentialsManagerService');
    this.CredentialsManager.credentials.subscribe(credentials => this.credentials = credentials);
  }

  ngOnInit() {
    this.connectionForm = this.formBuilder.group({
      description: ['', Validators.required],
      host: ['', Validators.required],
      port: [22, Validators.required],
      credential: ['', [Validators.required]],
      save: [true],
      autologin: [false],
      uuid: [null]
    });

    this.Ssh.activeConnection.subscribe((activeConnection: string) => {

      if (!activeConnection) return;

      (this.connectionForm.controls.description as FormControl).setValue(this.getActiveConnection().description);
      (this.connectionForm.controls.host as FormControl).setValue(this.getActiveConnection().host);
      (this.connectionForm.controls.port as FormControl).setValue(this.getActiveConnection().port);
      (this.connectionForm.controls.credential as FormControl).setValue(this.getActiveConnection().credential);
      (this.connectionForm.controls.save as FormControl).setValue(this.getActiveConnection().save);
      (this.connectionForm.controls.autologin as FormControl).setValue(this.getActiveConnection().autologin);
      (this.connectionForm.controls.uuid as FormControl).setValue(this.getActiveConnection().uuid);
    });
  }

  get f() { return this.connectionForm.controls; }

  sendConnect(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.connectionForm.invalid) return;

    this.Ssh.connect(this.connectionForm.value);

    this.submitted = false;
    this.connectionForm.reset();
  }

  manageCredentials() {
    this.Applications.openApplication('credentials-manager');
  }

  getActiveConnection(): SshConnection {
    return this.Ssh.getActiveConnection();
  }
}
