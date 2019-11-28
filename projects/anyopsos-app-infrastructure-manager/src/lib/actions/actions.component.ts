import {Component, Input, OnDestroy} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibUtilsService} from '@anyopsos/lib-utils';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSAppInfrastructureManagerService} from '../services/anyopsos-app-infrastructure-manager.service';

import {ImDataObject} from '../types/im-data-object';
import {ConnectionTypes} from '../types/connections/connection-types';

@Component({
  selector: 'saim-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnDestroy {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();
  activeConnection: string;

  constructor(private Utils: AnyOpsOSLibUtilsService,
              private Modal: AnyOpsOSLibModalService,
              private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService) {
    this.InfrastructureManager.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe(connection => this.activeConnection = connection);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  getActiveConnection(): ConnectionTypes {
    return this.InfrastructureManager.getActiveConnection();
  }

  getActiveObject(): ImDataObject {
    return this.InfrastructureManager.getActiveObject();
  }

  getActiveConnectionType(): string {
    const activeConnection = this.getActiveConnection();

    if (activeConnection) return activeConnection.type;
    return null;
  }

  getActiveObjectType(): string {
    const activeObject = this.getActiveObject();

    if (activeObject) return activeObject.type;
    return null;
  }

  /**
   * Button actions
   */
  goHome(): void {
    if (this.activeConnection === null || this.getActiveConnection().state === 'disconnected') this.Utils.scrollTo('infrastructure-manager_main-body');
    if (this.activeConnection === null) return;

    this.InfrastructureManager.setActiveConnection(null);
  }

  newConnection(): void {
    if (this.activeConnection === null) return this.Utils.scrollTo('infrastructure-manager_main-body', true);

    this.InfrastructureManager.setActiveConnection(null);
    setTimeout(() => this.Utils.scrollTo('infrastructure-manager_main-body', true), 100);
  }

  editConnection(): void {
    if (this.activeConnection === null) return;

    this.InfrastructureManager.editConnection();
  }

  disconnectConnection(): void {
    if (this.activeConnection === null) return;

    this.InfrastructureManager.disconnectConnection();
  }

  deleteConnection(): void {
    if (this.activeConnection === null) return;

    this.InfrastructureManager.deleteConnection();
  }

  // TODO
  configureConnection(): void {

  }
  remoteRefresh(): void {

  }
  openWithApp(applicationId: string): void {

  }
  runHIDS(): void {

  }

  /**
   * Kubernetes
   */
  createResource() {
    this.Modal.openRegisteredModal(
      'infrastructure-manager-kubernetes-create-resource',
      '.window--infrastructure-manager .window__main',
      {}
    ).then((modalInstance) => {
      modalInstance.result.then((result) => {
        console.log(result);
      });
    });
  }

  triggerResource() {
    this.Modal.openRegisteredModal(
      'infrastructure-manager-kubernetes-edit-resource',
      '.window--infrastructure-manager .window__main',
      {
        object: this.getActiveObject()
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result) => {
        console.log(result);
      });
    });
  }

  editResource() {
    this.Modal.openRegisteredModal(
      'infrastructure-manager-kubernetes-edit-resource',
      '.window--infrastructure-manager .window__main',
      {
        object: this.getActiveObject()
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result) => {
        console.log(result);
      });
    });
  }

  deleteResource() {
    this.Modal.openRegisteredModal(
      'infrastructure-manager-kubernetes-edit-resource',
      '.window--infrastructure-manager .window__main',
      {
        object: this.getActiveObject()
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result) => {
        console.log(result);
      });
    });
  }

}
