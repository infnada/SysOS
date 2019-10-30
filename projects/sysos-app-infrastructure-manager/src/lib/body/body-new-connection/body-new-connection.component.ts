import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Application, SysosLibApplicationService} from '@sysos/lib-application';
import {SysosLibServiceInjectorService} from '@sysos/lib-service-injector';
import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibUtilsService} from '@sysos/lib-utils';
import {Credential} from '@sysos/app-credentials-manager';

import {SysosAppInfrastructureManagerService} from '../../services/sysos-app-infrastructure-manager.service';
import {IMConnection} from '../../types/imconnection';

@Component({
  selector: 'saim-body-new-connection',
  templateUrl: './body-new-connection.component.html',
  styleUrls: ['./body-new-connection.component.scss']
})
export class BodyNewConnectionComponent implements OnInit, OnDestroy {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();
  private CredentialsManager;

  credentials: Credential[];
  connectionForm: FormGroup;
  submitted: boolean = false;
  newConnectionType: string = null;

  constructor(private formBuilder: FormBuilder,
              private Applications: SysosLibApplicationService,
              private serviceInjector: SysosLibServiceInjectorService,
              private Modal: SysosLibModalService,
              private Utils: SysosLibUtilsService,
              private InfrastructureManager: SysosAppInfrastructureManagerService) {

    this.CredentialsManager = this.serviceInjector.get('SysosAppCredentialsManagerService');
    this.CredentialsManager.credentials.pipe(takeUntil(this.destroySubject$)).subscribe(credentials => this.credentials = credentials);
  }

  ngOnDestroy() {
    this.connectionForm.reset();
    this.destroySubject$.next();
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

    this.InfrastructureManager.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe((activeConnection: string) => {
      if (!activeConnection) {

        // Reset form if needed on 'New Connection'
        // If valid is because user clicked on a connection with state 'disconnected' and then did 'New Connection'
        if (this.connectionForm.touched || this.connectionForm.valid) this.connectionForm.reset();
        return this.newConnectionType = null;
      }

      this.newConnectionType = this.getActiveConnection().type;

      (this.connectionForm.controls.description as FormControl).setValue(this.getActiveConnection(true).description);
      (this.connectionForm.controls.host as FormControl).setValue(this.getActiveConnection(true).host);
      (this.connectionForm.controls.port as FormControl).setValue(this.getActiveConnection(true).port);
      (this.connectionForm.controls.credential as FormControl).setValue(this.getActiveConnection(true).credential);
      (this.connectionForm.controls.type as FormControl).setValue(this.getActiveConnection(true).type);
      (this.connectionForm.controls.community as FormControl).setValue(this.getActiveConnection(true).community);
      (this.connectionForm.controls.save as FormControl).setValue(this.getActiveConnection(true).save);
      (this.connectionForm.controls.autologin as FormControl).setValue(this.getActiveConnection(true).autologin);
      (this.connectionForm.controls.uuid as FormControl).setValue(this.getActiveConnection(true).uuid);
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

  sendConnect(saveOnly: boolean = false): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.connectionForm.invalid) return;

    this.Modal.openLittleModal('PLEASE WAIT', (saveOnly ? 'Saving connection...' : 'Connecting to server...'), '.window--monitor .window__main', 'plain').then(() => {
      this.InfrastructureManager.connect(this.connectionForm.value, saveOnly);
      this.submitted = false;

      if (saveOnly) this.connectionForm.reset();
    });
  }

  manageCredentials() {
    this.Applications.openApplication('credentials-manager');
  }

  getActiveConnection(returnMain: boolean = false): IMConnection {
    return this.InfrastructureManager.getActiveConnection(returnMain);
  }

  /**
   * Weavescope graph
   */
  scrollTo(): void {
    this.Utils.scrollTo('infrastructure-manager_main-body', true);
  }

  setWeaveScopeNodes() {
    return this.InfrastructureManager.setWeaveScopeNodes();
  }

  selectedNodeChange($event) {
    return this.InfrastructureManager.selectedNodeChange($event);
  }
}
