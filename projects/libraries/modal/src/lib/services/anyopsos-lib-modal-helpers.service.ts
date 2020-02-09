import {Injectable} from '@angular/core';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';

import {AnyOpsOSLibModalRegisteredStateService} from './anyopsos-lib-modal-registered-state.service';
import {Modal} from '../types/modal';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibModalHelpersService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly ModalRegisteredState: AnyOpsOSLibModalRegisteredStateService) {
  }

  /**
   * Gets a connection state by given connectionUuid
   */
  getModalByUuid(modalUuid: string): Modal {
    const modals: Modal[] = this.ModalRegisteredState.getRegisteredModals();
    const currentModal: Modal = modals.find((modal: Modal) => {
      return modal.uuid === modalUuid;
    });

    if (!currentModal) {
      this.logger.error('LibSsh', 'getConnectionByUuid -> Resource invalid');
      throw new Error('resource_invalid');
    }
    return currentModal;
  }
}
