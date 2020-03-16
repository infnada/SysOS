import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

import {MatDialogRef} from '@anyopsos/lib-angular-material';
import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibUtilsService} from '@anyopsos/lib-utils';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSAppInfrastructureManagerService} from '../../services/anyopsos-app-infrastructure-manager.service';
import {ConnectionTypes} from '@anyopsos/backend-core/app/types/connection-types';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

@Component({
  selector: 'aaim-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnDestroy, OnInit {
  @Input() private readonly application: Application;

  private readonly destroySubject$: Subject<void> = new Subject();

  activeConnectionUuid: string | null;

  constructor(private readonly Utils: AnyOpsOSLibUtilsService,
              private readonly LibModal: AnyOpsOSLibModalService,
              private readonly InfrastructureManager: AnyOpsOSAppInfrastructureManagerService) {
  }

  ngOnInit(): void {

    // Listen for activeConnectionUuid change
    this.InfrastructureManager.activeConnectionUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string | null) => this.activeConnectionUuid = activeConnectionUuid);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  private getActiveConnection(): ConnectionTypes | null {
    return this.InfrastructureManager.getActiveConnection();
  }

  getActiveConnectionObs(): Observable<ConnectionTypes | null> {
    return this.InfrastructureManager.activeConnection;
  }

  private getActiveObject(): DataObject | null {
    return this.InfrastructureManager.getActiveObject();
  }

  getActiveObjectObs(): Observable<DataObject | null> {
    return this.InfrastructureManager.activeObject;
  }

  /**
   * Button actions
   */
  goHome(): void {
    const currentConnection: ConnectionTypes | null = this.getActiveConnection();

    if (this.activeConnectionUuid === null || currentConnection?.state === 'disconnected') this.Utils.angularElementScrollTo(this.InfrastructureManager.getBodyContainerRef().element.nativeElement);
    if (this.activeConnectionUuid === null) return;

    this.InfrastructureManager.setActiveConnectionUuid(null);
  }

  newConnection(): void {
    if (this.activeConnectionUuid === null) return this.Utils.angularElementScrollTo(this.InfrastructureManager.getBodyContainerRef().element.nativeElement, true);

    // even if activeConnection === null, set it again to reset possible Form changes
    this.InfrastructureManager.setActiveConnectionUuid(null);
    setTimeout(() => this.Utils.scrollTo('infrastructure-manager_main-body', true), 100);
  }

  editConnection(): void {
    if (this.activeConnectionUuid === null) return;

    this.InfrastructureManager.editConnection();
  }

  disconnectConnection(): void {
    if (this.activeConnectionUuid === null) return;

    this.InfrastructureManager.disconnectConnection();
  }

  deleteConnection(): void {
    if (this.activeConnectionUuid === null) return;

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
  async createResource() {

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal(
      'kubernetes-create-resource',
      this.InfrastructureManager.getBodyContainerRef(),
      {}
    );

    modalInstance.afterClosed().subscribe((result: string) => {
      if (!result) return;

      console.log(result);
    });
  }

  async triggerResource() {

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal(
      'kubernetes-edit-resource',
      this.InfrastructureManager.getBodyContainerRef(),
      {
        object: this.getActiveObject()
      }
    );

    modalInstance.afterClosed().subscribe((result: string) => {
      if (!result) return;

      console.log(result);
    });
  }

  async editResource() {

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal(
      'kubernetes-edit-resource',
      this.InfrastructureManager.getBodyContainerRef(),
      {
        object: this.getActiveObject()
      }
    );

    modalInstance.afterClosed().subscribe((result: string) => {
      if (!result) return;

      console.log(result);
    });
  }

  async deleteResource() {

    const activeObject: DataObject = this.getActiveObject();

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('question', this.InfrastructureManager.getBodyContainerRef(),
      {
        title: 'Delete a resource',
        text: `Are you sure you want to delete ${activeObject.type} <i>${activeObject.name}</i> ${
          activeObject.info.data.metadata.namespace ? `in namespace <i>${activeObject.info.data.metadata.namespace}</i>` : ''
        }?`,
        yes: 'Delete',
        yesClass: 'warn',
        no: 'Cancel',
        boxContent: `<span>This action is equivalent to: </span>
<code>kubectl delete ${
          activeObject.info.data.metadata.namespace ? `-n ${activeObject.info.data.metadata.namespace}` : ''
}
${activeObject.type} ${activeObject.name}</code>`,
        boxIcon: 'info'
      }
    );

    modalInstance.afterClosed().subscribe((result: string) => {
      if (!result) return;

      console.log(result);
    });
  }

  async scaleResource() {

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal(
      'kubernetes-scale-resource',
      this.InfrastructureManager.getBodyContainerRef(),
      {
        object: this.getActiveObject()
      }
    );

    modalInstance.afterClosed().subscribe((result: string) => {
      if (!result) return;

      console.log(result);
    });
  }

  async getLogs() {

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal(
      'kubernetes-logs',
      this.InfrastructureManager.getBodyContainerRef(),
      {
        object: this.getActiveObject()
      }
    );

    modalInstance.afterClosed().subscribe((result: string) => {
      if (!result) return;

      console.log(result);
    });
  }

  async execShell() {

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal(
      'kubernetes-shell',
      this.InfrastructureManager.getBodyContainerRef(),
      {
        object: this.getActiveObject(),
        shellType: 'exec'
      }
    );

    modalInstance.afterClosed().subscribe((result: string) => {
      if (!result) return;

      console.log(result);
    });
  }

  async attachShell() {

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal(
      'kubernetes-shell',
      this.InfrastructureManager.getBodyContainerRef(),
      {
        object: this.getActiveObject(),
        shellType: 'attach'
      }
    );

    modalInstance.afterClosed().subscribe((result: string) => {
      if (!result) return;

      console.log(result);
    });
  }

}
