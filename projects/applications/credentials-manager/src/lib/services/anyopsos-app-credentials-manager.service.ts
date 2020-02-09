import {Injectable, ViewContainerRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject, Observable} from 'rxjs';

import {MatDialogRef} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibCredentialService, AnyOpsOSLibCredentialHelpersService, AnyOpsOSLibCredentialStateService} from '@anyopsos/lib-credential';
import {Credential} from '@anyopsos/module-credential';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppCredentialsManagerService {
  private readonly $activeCredential: BehaviorSubject<Credential | null>;
  private readonly $activeCredentialUuid: BehaviorSubject<string | null>;
  private dataStore: {
    activeCredential: Credential | null;
    activeCredentialUuid: string | null;
  };
  readonly activeCredential: Observable<Credential | null>;
  readonly activeCredentialUuid: Observable<string | null>;

  private bodyContainer: ViewContainerRef;

  constructor(private readonly http: HttpClient,
              private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibModal: AnyOpsOSLibModalService,
              private readonly LibCredential: AnyOpsOSLibCredentialService,
              private readonly LibCredentialHelpers: AnyOpsOSLibCredentialHelpersService,
              private readonly LibCredentialState: AnyOpsOSLibCredentialStateService) {

    this.dataStore = { activeCredential: null, activeCredentialUuid: null };
    this.$activeCredential = new BehaviorSubject(this.dataStore.activeCredential);
    this.$activeCredentialUuid = new BehaviorSubject(this.dataStore.activeCredentialUuid);
    this.activeCredential = this.$activeCredential.asObservable();
    this.activeCredentialUuid = this.$activeCredentialUuid.asObservable();
  }

  /**
   * Setter of bodyContainerRef
   * This is used by Modals
   */
  setBodyContainerRef(bodyContainer: ViewContainerRef): void {
    this.bodyContainer = bodyContainer;
  }

  /**
   * Updates current activeCredentialUuid state
   */
  setActiveCredentialUuid(credentialUuid: string = null): void {
    this.dataStore.activeCredentialUuid = credentialUuid;

    // broadcast data to subscribers
    this.$activeCredentialUuid.next(Object.assign({}, this.dataStore).activeCredentialUuid);

    this.credentialsUpdated();
  }

  getActiveCredential(): Promise<Credential | null> {
    if (this.dataStore.activeCredentialUuid === null) return null;

    return this.LibCredentialHelpers.getCredentialByUuid(this.dataStore.activeCredentialUuid) as Promise<Credential>;
  }

  /**
   * Called every time the credentials state is updated
   */
  async credentialsUpdated(): Promise<void> {

    if (!this.dataStore.activeCredentialUuid) {
      this.dataStore.activeCredential = null;
    } else {
      this.dataStore.activeCredential = await this.LibCredentialHelpers.getCredentialByUuid(this.dataStore.activeCredentialUuid);
    }

    // broadcast data to subscribers
    this.$activeCredential.next(Object.assign({}, this.dataStore).activeCredential);
  }

  async saveCredential(credential: Credential): Promise<void> {
    if (!credential) throw new Error('resource_invalid');
    this.logger.debug('CredentialsManager', 'Credential received');

    // Editing an existing credential
    if (credential.uuid) {
      return this.LibCredentialState.patchFullCredential(credential);

    // New credential received
    } else {
      credential = {
        uuid: null, // Backend will return the correct uuid
        description: credential.description,
        type: credential.type,
        username: credential.username,
        password: credential.password
      };

      return this.LibCredentialState.putCredential(credential);
    }

  }

  async deleteCredential(credentialUuid?: string): Promise<void> {
    if (!credentialUuid) credentialUuid = this.dataStore.activeCredentialUuid;

    const currentCredential: Credential = await this.LibCredentialHelpers.getCredentialByUuid(credentialUuid);
    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('question', this.bodyContainer,
      {
        title: `Delete credential ${currentCredential.description}`,
        text: 'Remove the selected credential from the inventory?',
        yes: 'Delete',
        yesClass: 'warn',
        no: 'Cancel',
        boxContent: 'This action is permanent. All resources using this credential will fail...',
        boxClass: 'text-danger',
        boxIcon: 'warning'
      }
    );

    modalInstance.afterClosed().subscribe(async (result: boolean): Promise<void> => {
      if (result !== true) return;

      this.logger.debug('CredentialsManager', 'Deleting credential');

      this.setActiveCredentialUuid(null);

      await this.LibCredential.deleteCredential(credentialUuid);
    });

  }
}
