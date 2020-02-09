import {Injectable, ViewContainerRef, ComponentFactory, ComponentRef} from '@angular/core';

import {v4 as uuidv4} from 'uuid';

import {MatDialogRef, MatDialogConfig} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';

import {AnyOpsOSLibModalRegisteredStateService} from './anyopsos-lib-modal-registered-state.service';
import {AnyOpsOSLibModalHelpersService} from './anyopsos-lib-modal-helpers.service';
import {ModalType} from '../types/modal-type';
import {Modal} from '../types/modal';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibModalService {
  private modalInstances: MatDialogRef<any>[] = [];
  private mainContainerRef: ViewContainerRef;

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly ModalRegisteredState: AnyOpsOSLibModalRegisteredStateService,
              private readonly ModalHelpers: AnyOpsOSLibModalHelpersService) {
  }

  /**
   * This is set by main application component and used as a default ViewContainerRef when opening a Modal
   */
  setMainContainerRef(view: ViewContainerRef): void {
    this.mainContainerRef = view;
  }

  /**
   * Opens a registered modal
   */
  openRegisteredModal(
    modalUuid: string,
    viewContainerRef: ViewContainerRef = this.mainContainerRef,
    resolvers: { [key: string]: any } = {}
  ): Promise<MatDialogRef<any>> {

    return new Promise((resolve) => {

      const cmpFactory: ComponentFactory<any> = this.ModalHelpers.getModalByUuid(modalUuid).factory.componentFactories.find(
        (componentFactory: ComponentFactory<any>) => componentFactory.componentType.name === 'EntryComponent'
      );
      const cmpRef: ComponentRef<any> = viewContainerRef.createComponent(cmpFactory, 0, this.ModalHelpers.getModalByUuid(modalUuid).modRef.injector);

      const modalInstanceUuid: string = uuidv4();
      const size = this.ModalHelpers.getModalByUuid(modalUuid).size;
      (cmpRef.instance as any).dialogConfig = {
        data: resolvers,
        id: modalInstanceUuid,
        autoFocus: true,
        closeOnNavigation: false,
        disableClose: true,
        hasBackdrop: true,
        restoreFocus: true,
        maxHeight: (size === 'sm' ? '300px' : '500px'),
        maxWidth: (size === 'sm' ? '500px' : '900px'),
        minWidth: (size === 'sm' ? '400px' : '700px'),
        viewContainerRef
      } as MatDialogConfig;

      setTimeout(() => {
        this.modalInstances[modalInstanceUuid] = (cmpRef.instance as any).dialogRef;
        return resolve(this.modalInstances[modalInstanceUuid]);
      }, 0);
    });

  }

  /**
   * Alias to {@link openRegisteredModal} with "plain" modaluuid
   */
  openLittleModal(viewContainerRef: ViewContainerRef, title: string, text: string, type?: ModalType): Promise<MatDialogRef<any>> {

    return this.openRegisteredModal('plain', viewContainerRef, {
      title,
      text,
      type
    });

  }

  /**
   * Change text of already created modal.
   */
  changeModalData(modalUuid: string, prop: string, data: any): void {
    this.modalInstances[modalUuid].componentInstance[prop] = data;
  }

  /**
   * Alias of {@link changeModalData}. Change title of already created modal.
   */
  changeModalTitle(modalUuid: string, title: string): void {
    this.modalInstances[modalUuid].componentInstance.modalBody.title = title;
  }

  /**
   * Alias of {@link changeModalData}. Change type of already created modal.
   */
  changeModalType(modalUuid: string, type: ModalType): void {
    this.modalInstances[modalUuid].componentInstance.modalBody.type = type;
  }

  /**
   * Alias of {@link changeModalData}. Change text of already created modal.
   */
  changeModalText(modalUuid: string, text: string): void {
    this.changeModalData(modalUuid, 'text', text);
  }

  /**
   * Close already created modal
   */
  closeModal(modalUuid: string): void {
    if (this.modalInstances[modalUuid]) this.modalInstances[modalUuid].close('ok');
  }

  /**
   * Check if modal is opened
   */
  isModalOpened(modalUuid: string): boolean {
    return (this.modalInstances[modalUuid] && this.modalInstances[modalUuid]._contentRef);
  }

}
