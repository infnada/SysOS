import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {VaultState} from '@anyopsos/module-vault';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';

interface InitializeResult {
  keys: string[]; keys_base64: string[]; root_token: string; successCreated: boolean; userUuid: string; password: string;
}

@Component({
  selector: 'app-initialize',
  templateUrl: './initialize.component.html',
  styleUrls: ['./initialize.component.scss']
})
export class InitializeComponent {
  @Input() readonly vaultState: VaultState;
  @Output() private stateChanged = new EventEmitter<void>();

  vaultResult: InitializeResult;

  // Inputs
  rootAccount: string;
  unsealKey: string;

  constructor(private readonly http: HttpClient,
              private readonly logger: AnyOpsOSLibLoggerService) {

  }

  /**
   * User actions
   */
  initializeVault(): void {

    this.http.post('/api/vault/initialize', {
      username: this.rootAccount
    }).subscribe(
      (res: BackendResponse & { data: InitializeResult }) => {
        if (res.status === 'error') this.logger.error('anyOpsOS', 'initializeVault -> Error while initializing the Vault', null, res.data);

        if (res.status === 'ok') this.vaultResult = res.data;
      },
      (error: BackendResponse) => {
        this.logger.error('anyOpsOS', 'initializeVault -> Error while initializing the Vault', null, error);
      });
  }

  unsealVault(): void {

    this.http.post('/api/vault/unseal', {
      key: this.unsealKey
    }).subscribe(
      (res: BackendResponse & { data: InitializeResult }) => {
        if (res.status === 'error') this.logger.error('anyOpsOS', 'unsealVault -> Error while initializing the Vault', null, res.data);

        // This will recheck the Vault state
        if (res.status === 'ok') this.markStateChanged();
      },
      (error: BackendResponse) => {
        this.logger.error('anyOpsOS', 'unsealVault -> Error while initializing the Vault', null, error);
      });
  }

  createRootAccount(): void {

  }

  markStateChanged(): void {
    this.stateChanged.emit();
  }

}
