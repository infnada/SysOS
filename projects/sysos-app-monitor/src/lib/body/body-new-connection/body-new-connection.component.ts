import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Application, SysosLibApplicationService} from '@sysos/lib-application';
import {SysosLibServiceInjectorService} from '@sysos/lib-service-injector';
import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibUtilsService} from '@sysos/lib-utils';
import {Credential} from '@sysos/app-credentials-manager';

import {SysosAppMonitorService} from '../../services/sysos-app-monitor.service';
import {Netdata} from '../../types/netdata';

@Component({
  selector: 'samon-body-new-connection',
  templateUrl: './body-new-connection.component.html',
  styleUrls: ['./body-new-connection.component.scss']
})
export class BodyNewConnectionComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();
  private CredentialsManager;
  private InfrastructureManager;

  credentials: Credential[];
  connectionForm: FormGroup;
  submitted: boolean = false;
  newConnectionType: string = null;

  constructor(private formBuilder: FormBuilder,
              private Applications: SysosLibApplicationService,
              private serviceInjector: SysosLibServiceInjectorService,
              private Modal: SysosLibModalService,
              private Utils: SysosLibUtilsService,
              private Monitor: SysosAppMonitorService) {

    this.CredentialsManager = this.serviceInjector.get('SysosAppCredentialsManagerService');
    this.CredentialsManager.credentials.pipe(takeUntil(this.destroySubject$)).subscribe(credentials => this.credentials = credentials);
    this.InfrastructureManager = this.serviceInjector.get('SysosAppInfrastructureManagerService');
  }

  ngOnInit() {
    this.connectionForm = this.formBuilder.group({
      description: ['', Validators.required],
      url: ['', [
        Validators.required,
        Validators.pattern(/^([a-z0-9]+):\/\//)
      ]],
      withCredential: [false],
      credential: [''],
      save: [true],
      autologin: [false],
      uuid: [null],
      type: [null]
    });

    this.Monitor.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe((activeConnection: string) => {
      if (!activeConnection) {

        // Reset form if needed on 'New Connection'
        // If valid is because user clicked on a connection with state 'disconnected' and then did 'New Connection'
        if (this.connectionForm.touched || this.connectionForm.valid) this.connectionForm.reset();
        return this.newConnectionType = null;
      }

      this.newConnectionType = this.getActiveConnection().type;

      (this.connectionForm.controls.description as FormControl).setValue(this.getActiveConnection().description);
      (this.connectionForm.controls.url as FormControl).setValue(this.getActiveConnection().url);
      (this.connectionForm.controls.withCredential as FormControl).setValue(this.getActiveConnection().withCredential);
      (this.connectionForm.controls.credential as FormControl).setValue(this.getActiveConnection().credential);
      (this.connectionForm.controls.save as FormControl).setValue(this.getActiveConnection().save);
      (this.connectionForm.controls.autologin as FormControl).setValue(this.getActiveConnection().autologin);
      (this.connectionForm.controls.uuid as FormControl).setValue(this.getActiveConnection().uuid);
      (this.connectionForm.controls.type as FormControl).setValue(this.getActiveConnection().type);
    });

  }

  ngOnDestroy() {
    this.connectionForm.reset();
    this.destroySubject$.next();
  }

  get f() { return this.connectionForm.controls; }

  setConnectionType(type: string): void {
    this.newConnectionType = type;
    (this.connectionForm.controls.type as FormControl).setValue(type);
  }

  sendConnect(saveOnly: boolean = false): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.connectionForm.invalid) return;

    this.Modal.openLittleModal('PLEASE WAIT', (saveOnly ? 'Saving connection...' : 'Connecting to server...'), '.window--monitor .window__main', 'plain').then(() => {
      this.Monitor.connect(this.connectionForm.value, saveOnly);
      this.submitted = false;

      if (saveOnly) this.connectionForm.reset();
    });
  }

  manageCredentials(): void {
    this.Applications.openApplication('credentials-manager');
  }

  getActiveConnection(): Netdata {
    return this.Monitor.getActiveConnection();
  }

  /**
   * Weavescope graph
   */
  scrollTo(): void {
    this.Utils.scrollTo('monitor_main-body', true);
  }

  setWeaveScopeNodes() {
    return this.InfrastructureManager.setWeaveScopeNodes();
  }

  selectedNodeChange($event) {
    return this.InfrastructureManager.selectedNodeChange($event);
  }
}
