import {Injectable} from '@angular/core';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';

import {Modal} from '../types/modal';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibModalRegisteredStateService {
  private registeredModals: Modal[] = [];

  constructor(private readonly logger: AnyOpsOSLibLoggerService) {
  }

  getRegisteredModals(): Modal[] {
    return this.registeredModals;
  }

  /**
   * Each Modal constructor calls this function to register a modalUuid and its size
   */
  putModal(data: Modal): void {
    this.logger.debug('LibModal', 'New modal registration', arguments);

    const modalExists: Modal = this.registeredModals.find((modal: Modal) => modal.uuid === data.uuid);
    if (modalExists) {
      this.logger.error('LibModal', 'putModal -> Resource already exists', arguments);
      throw new Error('resource_already_exists');
    }

    this.registeredModals.push(data);
  }

  /**
   * Called by {@link AnyOpsOSLibLoaderService#loadModal}
   */
  patchModal(modalUuid: string, param: string, data: any): void {
    const modalIndex: number = this.registeredModals.findIndex((modal: Modal) => modal.uuid === modalUuid);
    if (modalIndex === -1) {
      this.logger.error('LibModal', 'patchModal -> Resource invalid', arguments);
      throw new Error('resource_invalid');
    }

    this.registeredModals[modalIndex][param] = data;
  }


}
