import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Observable, Subject} from 'rxjs';
import {map, startWith, takeUntil} from 'rxjs/operators';

import {Application, AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibUtilsService} from '@anyopsos/lib-utils';
import {Credential} from '@anyopsos/app-credentials-manager';
import {ImDataObject} from '@anyopsos/app-infrastructure-manager';

import {AnyOpsOSAppMonitorService} from '../../services/anyopsos-app-monitor.service';
import {Netdata} from '../../types/netdata';

interface LinkTo {
  type: string;
  nodes: ImDataObject[];
}

const nodesFilter = (opt: ImDataObject[], value: string | ImDataObject): ImDataObject[] => {
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

  private currentGraphTopology: string = null;

  credentials: Credential[];
  connectionForm: FormGroup;
  submitted: boolean = false;
  newConnectionType: string = null;

  linkGroups: LinkTo[];

  linkToOptions: Observable<LinkTo[]>;

  constructor(private readonly formBuilder: FormBuilder,
              private Applications: AnyOpsOSLibApplicationService,
              private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private Modal: AnyOpsOSLibModalService,
              private Utils: AnyOpsOSLibUtilsService,
              private Monitor: AnyOpsOSAppMonitorService) {

    this.CredentialsManager = this.serviceInjector.get('AnyOpsOSAppCredentialsManagerService');
    this.InfrastructureManagerNodeGraph = this.serviceInjector.get('AnyOpsOSAppInfrastructureManagerNodeGraphService');
    this.InfrastructureManagerObjectHelper = this.serviceInjector.get('AnyOpsOSAppInfrastructureManagerObjectHelperService');
  }

  ngOnInit(): void {
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

    // Listen for credentials changes
    this.CredentialsManager.credentials
      .pipe(takeUntil(this.destroySubject$)).subscribe((credentials: Credential[]) => this.credentials = credentials);

    // Listen for activeConnection change
    this.Monitor.activeConnection
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string) => this.onActiveConnectionChange(activeConnectionUuid));

    this.generateLinkGroups();
  }

  ngOnDestroy(): void {
    this.connectionForm.reset();

    // Remove all listeners
    this.destroySubject$.next();
  }

  private onActiveConnectionChange(activeConnectionUuid: string): void {
    if (!activeConnectionUuid) {
      this.connectionForm.reset();
      return this.newConnectionType = null;
    }

    this.newConnectionType = this.getActiveConnection().type;

    this.connectionForm.controls.description.setValue(this.getActiveConnection().description);
    this.connectionForm.controls.url.setValue(this.getActiveConnection().url);
    this.connectionForm.controls.withCredential.setValue(this.getActiveConnection().withCredential);
    this.connectionForm.controls.credential.setValue(this.getActiveConnection().credential);
    this.connectionForm.controls.save.setValue(this.getActiveConnection().save);
    this.connectionForm.controls.autologin.setValue(this.getActiveConnection().autologin);
    this.connectionForm.controls.uuid.setValue(this.getActiveConnection().uuid);
    this.connectionForm.controls.type.setValue(this.getActiveConnection().type);
  }

  private generateLinkGroups() {
    // Create linkGroups with VMs, Nodes, Pods...
    const linkVirtualMachines = this.InfrastructureManagerObjectHelper.getObjectsByType(null, 'VirtualMachine');
    const linkPods = this.InfrastructureManagerObjectHelper.getObjectsByType(null, 'Pod');
    const linkNodes = this.InfrastructureManagerObjectHelper.getObjectsByType(null, 'Node');
    if (linkVirtualMachines.length !== 0 || linkPods.length !== 0 || linkNodes.length !== 0) {
      // TODO: Make this private
      this.linkGroups = [
        {
          type: 'Virtual Machines',
          nodes: linkVirtualMachines
        },
        {
          type: 'Pods',
          nodes: linkPods
        },
        {
          type: 'Nodes',
          nodes: linkNodes
        }
      ];
    }

    this.linkToOptions = this.connectionForm.get('linkTo').valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterGroup(value))
      );
  }

  private filterGroup(value: string): LinkTo[] {
    if (value) {
      return this.linkGroups
        .map(group => ({type: group.type, nodes: nodesFilter(group.nodes, value)}))
        .filter(group => group.nodes.length > 0);
    }

    return this.linkGroups;
  }

  /**
   * Form getter
   */
  get f(): { [key: string]: AbstractControl } { return this.connectionForm.controls; }

  /**
   * mat-autocomplete displayWith
   */
  displayFn(node?: ImDataObject): string | undefined {
    return node ? node.name : undefined;
  }

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

  setNodeGraphNodes() {
    return this.InfrastructureManagerNodeGraph.setNodeGraphNodes(this.currentGraphTopology);
  }

  setNodeGraphTopologies() {
    return this.InfrastructureManagerNodeGraph.getTopologies();
  }

  selectedTopologyChange($event) {
    this.currentGraphTopology = $event;
  }

  selectedNodeChange($event) {
    return this.InfrastructureManagerNodeGraph.selectedNodeChange($event);
  }
}
