import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Application, SysosLibApplicationService} from '@sysos/lib-application';
import {SysosLibServiceInjectorService} from '@sysos/lib-service-injector';
import {Credential} from '@sysos/app-credentials-manager';

import {IMConnection} from '../../types/imconnection';
import {SysosAppInfrastructureManagerService} from '../../services/sysos-app-infrastructure-manager.service';

@Component({
  selector: 'saim-body-new-connection',
  templateUrl: './body-new-connection.component.html',
  styleUrls: ['./body-new-connection.component.scss']
})
export class BodyNewConnectionComponent implements OnInit {
  @Input() application: Application;

  private CredentialsManager;

  credentials: Credential[];
  connectionForm: FormGroup;
  submitted: boolean = false;
  newConnectionType: string = null;

  constructor(private formBuilder: FormBuilder,
              private Applications: SysosLibApplicationService,
              private serviceInjector: SysosLibServiceInjectorService,
              private InfrastructureManager: SysosAppInfrastructureManagerService) {

    this.CredentialsManager = this.serviceInjector.get('SysosAppCredentialsManagerService');
    this.CredentialsManager.credentials.subscribe(credentials => this.credentials = credentials);
  }

  ngOnInit() {
    this.connectionForm = this.formBuilder.group({
      description: ['', Validators.required],
      host: ['', Validators.required],
      port: [0, Validators.required],
      credential: ['', [Validators.required]],
      type: ['', [Validators.required]],
      community: ['public', [Validators.required]],
      save: [true],
      autologin: [true],
      uuid: [null]
    });

    this.InfrastructureManager.activeConnection.subscribe((activeConnection: string) => {

      if (!activeConnection) return;

      (this.connectionForm.controls.description as FormControl).setValue(this.getActiveConnection().description);
      (this.connectionForm.controls.host as FormControl).setValue(this.getActiveConnection().host);
      (this.connectionForm.controls.port as FormControl).setValue(this.getActiveConnection().port);
      (this.connectionForm.controls.credential as FormControl).setValue(this.getActiveConnection().credential);
      (this.connectionForm.controls.type as FormControl).setValue(this.getActiveConnection().type);
      (this.connectionForm.controls.community as FormControl).setValue(this.getActiveConnection().community);
      (this.connectionForm.controls.save as FormControl).setValue(this.getActiveConnection().save);
      (this.connectionForm.controls.autologin as FormControl).setValue(this.getActiveConnection().autologin);
      (this.connectionForm.controls.uuid as FormControl).setValue(this.getActiveConnection().uuid);
    });
  }

  get f() { return this.connectionForm.controls; }

  setConnectionType(type: string): void {
    this.newConnectionType = type;

    (this.connectionForm.controls.type as FormControl).setValue(type);
    (this.connectionForm.controls.port as FormControl).setValue(
      (type === 'vmware' ? 443 : (type === 'netapp' ? 443 : (type === 'linux' ? 22 : (type === 'snmp' ? 161 : 0))))
    );
  }

  sendConnect(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.connectionForm.invalid) return;

    this.InfrastructureManager.connect(this.connectionForm.value);

    this.submitted = false;
    this.connectionForm.reset();
  }

  manageCredentials() {
    this.Applications.openApplication('credentials-manager');
  }

  getActiveConnection(): IMConnection {
    return this.InfrastructureManager.getActiveConnection();
  }
}
