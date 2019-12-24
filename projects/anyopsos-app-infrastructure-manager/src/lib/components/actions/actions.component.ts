import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibUtilsService} from '@anyopsos/lib-utils';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSAppInfrastructureManagerService} from '../../services/anyopsos-app-infrastructure-manager.service';

import {ImDataObject} from '../../types/im-data-object';
import {ConnectionTypes} from '../../types/connections/connection-types';

@Component({
  selector: 'saim-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();
  activeConnection: string;

  constructor(private Utils: AnyOpsOSLibUtilsService,
              private Modal: AnyOpsOSLibModalService,
              private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService) {
  }

  ngOnInit(): void {

    // Listen for activeConnection change
    this.InfrastructureManager.activeConnection
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string) => this.activeConnection = activeConnectionUuid);
  }

  ngOnDestroy(): void {

    // Remove all listeners
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

    // even if activeConnection === null, set it again to reset possible Form changes
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
    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Delete a resource',
        text: `Are you sure you want to delete ${this.getActiveObject().type} <i>${this.getActiveObject().name}</i> ${
          this.getActiveObject().info.data.metadata.namespace ? `in namespace <i>${this.getActiveObject().info.data.metadata.namespace}</i>` : ''
        }?`,
        yes: 'Delete',
        yesClass: 'warn',
        no: 'Cancel',
        boxContent: `<span>This action is equivalent to: </span>
<code>kubectl delete ${
  this.getActiveObject().info.data.metadata.namespace ? `-n ${this.getActiveObject().info.data.metadata.namespace}` : ''
}
${this.getActiveObject().type} ${this.getActiveObject().name}</code>`,
        boxIcon: 'info'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result !== true) return;
      });
    });
  }

  scaleResource() {
    this.Modal.openRegisteredModal(
      'infrastructure-manager-kubernetes-scale-resource',
      '.window--infrastructure-manager .window__main',
      {
        object: this.getActiveObject()
      }
    ).then((modalInstance) => {

    });
  }

  getLogs() {
    this.Modal.openRegisteredModal(
      'infrastructure-manager-kubernetes-logs',
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

  execShell() {
    this.Modal.openRegisteredModal(
      'infrastructure-manager-kubernetes-shell',
      '.window--infrastructure-manager .window__main',
      {
        object: this.getActiveObject(),
        shellType: 'exec'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result) => {
        console.log(result);
      });
    });
  }

  attachShell() {
    this.Modal.openRegisteredModal(
      'infrastructure-manager-kubernetes-shell',
      '.window--infrastructure-manager .window__main',
      {
        object: this.getActiveObject(),
        shellType: 'attach'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result) => {
        console.log(result);
      });
    });
  }

}
