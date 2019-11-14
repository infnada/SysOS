import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Observable, Subject} from 'rxjs';
import {map, startWith, takeUntil} from 'rxjs/operators';

import {Application, AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibUtilsService} from '@anyopsos/lib-utils';
import {Credential} from '@anyopsos/app-credentials-manager';
import {VMWareObject} from '@anyopsos/app-infrastructure-manager';

import {AnyOpsOSAppMonitorService} from '../../services/anyopsos-app-monitor.service';
import {Netdata} from '../../types/netdata';

interface linkTo {
  type: string;
  nodes: VMWareObject[];
}

const _filter = (opt: VMWareObject[], value: string | VMWareObject): VMWareObject[] => {
  const filterValue = (typeof value === 'string' ? value.toLowerCase() : value.name.toLowerCase());

  return opt.filter(item => item.name.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'samon-body-new-connection',
  templateUrl: './body-new-connection.component.html',
  styleUrls: ['./body-new-connection.component.scss']
})
export class BodyNewConnectionComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();
  private CredentialsManager;
  private InfrastructureManagerNodeGraph;
  private InfrastructureManagerObjectHelper;

  credentials: Credential[];
  connectionForm: FormGroup;
  submitted: boolean = false;
  newConnectionType: string = null;

  linkGroups: linkTo[];

  linkToOptions: Observable<linkTo[]>;

  constructor(private formBuilder: FormBuilder,
              private Applications: AnyOpsOSLibApplicationService,
              private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private Modal: AnyOpsOSLibModalService,
              private Utils: AnyOpsOSLibUtilsService,
              private Monitor: AnyOpsOSAppMonitorService) {

    this.CredentialsManager = this.serviceInjector.get('AnyOpsOSAppCredentialsManagerService');
    this.CredentialsManager.credentials.pipe(takeUntil(this.destroySubject$)).subscribe(credentials => this.credentials = credentials);
    this.InfrastructureManagerNodeGraph = this.serviceInjector.get('AnyOpsOSAppInfrastructureManagerNodeGraphService');
    this.InfrastructureManagerObjectHelper = this.serviceInjector.get('AnyOpsOSAppInfrastructureManagerObjectHelperService');

    this.linkGroups = [{
      type: 'Virtual Machines',
      nodes: this.InfrastructureManagerObjectHelper.getObjectsByType('VirtualMachine')
    }];
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
      linkTo: '',
      save: [true],
      autologin: [false],
      uuid: [null],
      type: [null]
    });

    this.linkToOptions = this.connectionForm.get('linkTo')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );

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

  private _filterGroup(value: string): linkTo[] {
    if (value) {
      return this.linkGroups
        .map(group => ({type: group.type, nodes: _filter(group.nodes, value)}))
        .filter(group => group.nodes.length > 0);
    }

    return this.linkGroups;
  }

  displayFn(node?: VMWareObject): string | undefined {
    return node ? node.name : undefined;
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
    return this.InfrastructureManagerNodeGraph.setWeaveScopeNodes();
  }

  selectedNodeChange($event) {
    return this.InfrastructureManagerNodeGraph.selectedNodeChange($event);
  }
}
