import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Application, AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibUtilsService} from '@anyopsos/lib-utils';
import {Credential} from '@anyopsos/app-credentials-manager';

import {AnyOpsOSAppInfrastructureManagerService} from '../../../services/anyopsos-app-infrastructure-manager.service';
import {AnyOpsOSAppInfrastructureManagerNodeGraphService} from '../../../services/anyopsos-app-infrastructure-manager-node-graph.service';

import {ConnectionTypes} from '../../../types/connections/connection-types';

@Component({
  selector: 'saim-body-new-connection',
  templateUrl: './body-new-connection.component.html',
  styleUrls: ['./body-new-connection.component.scss']
})
export class BodyNewConnectionComponent implements OnInit, OnDestroy {
  @ViewChild('scrollToElement') scrollToElement: ElementRef<HTMLInputElement>;
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();
  private CredentialsManager;
  private currentGraphTopology: string = null;

  credentials: Credential[];
  connectionForm: FormGroup;
  submitted: boolean = false;
  newConnectionType: string = null;

  constructor(private formBuilder: FormBuilder,
              private Applications: AnyOpsOSLibApplicationService,
              private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private Modal: AnyOpsOSLibModalService,
              private Utils: AnyOpsOSLibUtilsService,
              private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService,
              private InfrastructureManagerNodeGraph: AnyOpsOSAppInfrastructureManagerNodeGraphService) {

    this.CredentialsManager = this.serviceInjector.get('AnyOpsOSAppCredentialsManagerService');
    this.CredentialsManager.credentials.pipe(takeUntil(this.destroySubject$)).subscribe(credentials => this.credentials = credentials);
  }

  ngOnDestroy(): void {
    this.connectionForm.reset();
    this.destroySubject$.next();
  }

  ngOnInit(): void {

    /**
     * Create basic form
     */
    this.connectionForm = this.formBuilder.group({
      description: ['', Validators.required],
      clusterName: [''],
      clusterServer: [''],
      clusterCa: [''],
      host: [''],
      port: [0],
      credential: [''],
      type: ['', Validators.required],
      community: ['public'],
      save: [true],
      autologin: [true],
      uuid: [null]
    });

    /**
     * Update validators on type change
     */
    this.connectionForm.get('type').valueChanges
      .pipe(takeUntil(this.destroySubject$)).subscribe(type => {

        if (type === 'kubernetes') {
          this.connectionForm.controls.clusterName.setValidators([Validators.required]);
          this.connectionForm.controls.clusterServer.setValidators([Validators.required]);
          this.connectionForm.controls.clusterCa.setValidators([Validators.required]);
          this.connectionForm.controls.clusterName.updateValueAndValidity();
          this.connectionForm.controls.clusterServer.updateValueAndValidity();
          this.connectionForm.controls.clusterCa.updateValueAndValidity();
        } else {
          this.connectionForm.controls.host.setValidators([Validators.required]);
          this.connectionForm.controls.port.setValidators([Validators.required]);
          this.connectionForm.controls.host.updateValueAndValidity();
          this.connectionForm.controls.port.updateValueAndValidity();
        }

        if (type === 'snmp') {
          this.connectionForm.controls.community.setValidators([Validators.required]);
          this.connectionForm.controls.community.updateValueAndValidity();
        } else {
          this.connectionForm.controls.credential.setValidators([Validators.required]);
          this.connectionForm.controls.credential.updateValueAndValidity();
        }
    });

    /**
     * Set Form data on connection change
     */
    this.InfrastructureManager.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe((activeConnection: string) => {
      if (!activeConnection) {
        this.connectionForm.reset({
          save: true,
          autologin: true,
          uuid: null
        });
        return this.newConnectionType = null;
      }

      const currentConnection = this.getActiveConnection();

      this.newConnectionType = currentConnection.type;

      if (currentConnection.type === 'kubernetes' || currentConnection.type === 'docker') {
        (this.f.clusterName as FormControl).setValue(currentConnection.clusterName);
        (this.f.clusterServer as FormControl).setValue(currentConnection.clusterServer);
        (this.f.clusterCa as FormControl).setValue(currentConnection.clusterCa);
      } else {
        (this.f.host as FormControl).setValue(currentConnection.host);
        (this.f.port as FormControl).setValue(currentConnection.port);
      }

      if (currentConnection.type === 'snmp') {
        (this.f.community as FormControl).setValue(currentConnection.community);
      } else {
        (this.f.credential as FormControl).setValue(currentConnection.credential);
      }

      (this.f.description as FormControl).setValue(currentConnection.description);
      (this.f.type as FormControl).setValue(currentConnection.type);
      (this.f.save as FormControl).setValue(currentConnection.save);
      (this.f.autologin as FormControl).setValue(currentConnection.autologin);
      (this.f.uuid as FormControl).setValue(currentConnection.uuid);
    });
  }

  get f(): { [key: string]: AbstractControl } { return this.connectionForm.controls; }

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

    this.Modal.openLittleModal('PLEASE WAIT', (saveOnly ? 'Saving connection...' : 'Connecting to server...'), '.window--infrastructure-manager .window__main', 'plain').then(() => {
      this.InfrastructureManager.connect(this.connectionForm.value, saveOnly);
      this.submitted = false;

      if (saveOnly) this.connectionForm.reset({
        save: true,
        autologin: true,
        uuid: null
      });
    });
  }

  manageCredentials() {
    this.Applications.openApplication('credentials-manager');
  }

  getActiveConnection(): ConnectionTypes {
    return this.InfrastructureManager.getActiveConnection();
  }

  /**
   * NodeGraph
   */
  scrollTo(): void {
    console.log(this.scrollToElement);
    console.log(this.scrollToElement.nativeElement);
    console.log(this.scrollToElement.nativeElement.parentElement);
    console.log(this.scrollToElement.nativeElement.parentElement.parentElement);
    this.Utils.angularElementScrollTo(this.scrollToElement.nativeElement.parentElement.parentElement, true);
  }

  setNodeGraphNodes() {
    return this.InfrastructureManagerNodeGraph.setNodeGraphNodes(this.currentGraphTopology);
  }

  selectedTopologyChange($event) {
    this.currentGraphTopology = $event;
  }

  selectedNodeChange($event) {
    return this.InfrastructureManagerNodeGraph.selectedNodeChange($event);
  }
}
