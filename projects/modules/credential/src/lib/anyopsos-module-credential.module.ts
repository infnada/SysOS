import {getLogger, Logger} from 'log4js';
import {client} from 'node-vault';

import {AnyOpsOSSysWorkspaceModule} from '@anyopsos/module-sys-workspace';
import {AnyOpsOSVaultModule} from '@anyopsos/module-vault';

import {Credential} from './types/credential';


const logger: Logger = getLogger('credential');

/**
 * This module will only work inside 'anyopsos-auth' Pod since it uses the Kubernetes Pod Service Account to login with Vault
 */
export class AnyOpsOSCredentialModule {

  private readonly WorkspaceModule: AnyOpsOSSysWorkspaceModule;
  private readonly VaultModule: AnyOpsOSVaultModule = new AnyOpsOSVaultModule();
  private readonly vaultClient: client = this.VaultModule.getVaultClient();

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string) {

    // TODO: check if userUuid & sessionUuid matches
    // TODO: check if userUuid is allowed to access the data from workspaceUuid
    this.WorkspaceModule = new AnyOpsOSSysWorkspaceModule(this.userUuid, this.sessionUuid);

    // this.WorkspaceModule.getUserPermissions();
  }


  /**
   * From here, we must make sure that we are allowed to access/modify the credential/s information by using the Class Constructor provided data
   * Credentials are split by Workspaces, which means that we have to validate this.userId with this.sessionUuid and then if this.userId belongs to this.workspaceUuid
   * --------
   */

  /**
   * Gets all credentials but without passwords.
   * This is the main function called by the credentials library (lib-credentials) to show to the users the credentials available for the current workspace
   * Frontend call this using the API
   */
  async getCredentials(): Promise<Credential[]> {
    logger.trace(`[Module Credentials] -> getCredential -> userUuid [${this.userUuid}], workspaceUuid [${this.workspaceUuid}]`);

    return this.vaultClient.list(`secret/workspaces/${this.workspaceUuid}`);
  }

  /**
   * Returns a credential with the password
   * This data should never be returned to the user. anyOpsOS doesn't allow to send passwords back to the user
   * This is used by other modules to connect with "something"
   * TODO: since this function is exposed by an API, make sure this can't be called by an user from the browser. Validate 'anyopsos-core' Pod certificate
   */
  async getCredential(credentialUuid: string): Promise<Credential> {
    logger.trace(`[Module Credentials] -> getCredential -> userUuid [${this.userUuid}], workspaceUuid [${this.workspaceUuid}], credentialUuid [${credentialUuid}]`);

    return this.vaultClient.read(`secret/workspaces/${this.workspaceUuid}/${credentialUuid}`);
  }

  /**
   * Creates a new credential. Some modules can call this as well (infrastructure as code applications...)
   * Users call this using the API
   * TODO: check if user is allowed to write data to this workspace (not read-only)
   * TODO: check if already exists (patch)
   */
  async putCredential(credential: Credential): Promise<string> {
    logger.trace(`[Module Credentials] -> putCredential -> userUuid [${this.userUuid}], workspaceUuid [${this.workspaceUuid}], credentialUuid [${credential.uuid}]`);

    await this.vaultClient.write(`secret/workspaces/${this.workspaceUuid}/${credential.uuid}`, credential);

    return credential.uuid;
  }

  /**
   * Modifies a credential. Some modules can call this as well (rotate passwords...)
   * Users call this using the API
   * TODO: check if user is allowed to modify data from this workspace (not read-only)
   * TODO: check if not exists (put)
   */
  async patchCredential(credentialUuid: string, credential: Credential): Promise<string> {
    logger.trace(`[Module Credentials] -> patchCredential -> userUuid [${this.userUuid}], workspaceUuid [${this.workspaceUuid}], credentialUuid [${credentialUuid}]`);

    await this.vaultClient.write(`secret/workspaces/${this.workspaceUuid}/${credentialUuid}`, credential);

    return credential.uuid;
  }

  /**
   * Deletes a credential.
   * Users call this using the API
   * TODO: check if user is allowed to delete data from this workspace (not read-only)
   * TODO: check if not exists
   */
  async deleteCredential(credentialUuid: string): Promise<void> {
    logger.trace(`[Module Credentials] -> deleteCredential -> userUuid [${this.userUuid}], workspaceUuid [${this.workspaceUuid}], credentialUuid [${credentialUuid}]`);

    await this.vaultClient.delete(`secret/workspaces/${this.workspaceUuid}/${credentialUuid}`);

    return;
  }

}
