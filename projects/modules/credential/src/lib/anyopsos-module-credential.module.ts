import {Credentials, Entry, Group, Kdbx, ProtectedValue} from 'kdbxweb';
import {outputFile, readFile} from 'fs-extra';
import {join} from 'path';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSGetPathModule} from '@anyopsos/module-get-path';
import {AnyOpsOSWorkspaceModule} from '@anyopsos/module-workspace';

import {WorkspaceDbMap} from './types/workspace-db-map';
import {KdbxCredential} from './types/kxdb-credential';
import {Credential} from './types/credential';

import {CREDENTIAL_FILE_NAME} from './anyopsos-module-credential.constants';


const logger: Logger = getLogger('mainLog');
const loadedDbs: WorkspaceDbMap = {};

export class AnyOpsOSCredentialModule {

  private readonly GetPathModule: AnyOpsOSGetPathModule;
  private readonly WorkspaceModule: AnyOpsOSWorkspaceModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string) {

    this.GetPathModule = new AnyOpsOSGetPathModule();
    this.WorkspaceModule = new AnyOpsOSWorkspaceModule(this.userUuid, this.sessionUuid);
  }

  /**
   * Saves the DB on disk
   */
  private async saveDb(): Promise<void> {
    logger.debug(`[Module Credentials] -> saveDb -> userUuid [${this.userUuid}]`);

    const dataAsArrayBuffer: ArrayBuffer = await loadedDbs[this.workspaceUuid].save();
    const credentialPath: string = join(this.WorkspaceModule.getWorkspacePath(this.workspaceUuid), CREDENTIAL_FILE_NAME);

    return outputFile(credentialPath, Buffer.from(dataAsArrayBuffer));
  }

  /**
   * Creates new KeePass empty database. This is only called by anyOpsOS
   * TODO check if user already exists on shadow.json and if dbfile already exists
   * TODO (SECURITY) anyone can "flush" any db
   * TODO this is not working
   */
  async createNewDb(userUuid: string, name: string): Promise<void> {
    logger.debug(`[Module Credentials] -> createNewDb -> userUuid [${userUuid}], name [${name}]`);

    // @ts-ignore - NO KEYFILE (2nd argument)
    const credentials: Credentials = new Credentials(ProtectedValue.fromString('root'));
    loadedDbs[this.workspaceUuid] = Kdbx.create(credentials, name);

    return this.saveDb();
  }

  /**
   * Loads a KeePass database in memory
   */
  async loadCredentialDb(password: string): Promise<boolean> {
    logger.debug(`[Module Credentials] -> loadCredentialDb -> userUuid [${this.userUuid}]`);

    const credentialPath: string = join(this.WorkspaceModule.getWorkspacePath(this.workspaceUuid), CREDENTIAL_FILE_NAME);
    const dataAsArrayBuffer = await readFile(credentialPath);

    // @ts-ignore - NO KEYFILE (2nd argument)
    const credentials: Credentials = new Credentials(ProtectedValue.fromString(password));

    return Kdbx.load(dataAsArrayBuffer.buffer, credentials).then((db: Kdbx) => {

      loadedDbs[this.workspaceUuid] = db;

      return true;
    }).catch((e) => {
      console.log(e);
      return false;
    });
  }

  /**
   * Gets all credentials but without protected values
   */
  async getCredentials(): Promise<Credential[]> {
    logger.debug(`[Module Credentials] -> getCredentials -> userUuid [${this.userUuid}]`);

    const credentials: Credential[] = [];
    await loadedDbs[this.workspaceUuid].getDefaultGroup().entries.forEach((entry: Entry) => {
      credentials.push({
        // @ts-ignore TODO
        uuid: entry.uuid.id,
        // @ts-ignore TODO
        description: entry.fields.Title,
        // @ts-ignore TODO
        username: entry.fields.UserName,
        // @ts-ignore TODO
        type: entry.fields.Type
      });
    });

    return credentials;
  }

  /**
   * Gets a credential by uuid
   */
  async getCredential(credentialUuid: string): Promise<KdbxCredential> {
    logger.debug(`[Module Credentials] -> getCredentials -> userUuid [${this.userUuid}], credentialUuid [${credentialUuid}]`);

    const credential = loadedDbs[this.workspaceUuid].getDefaultGroup().entries.find((entry: Entry) => entry.uuid.id === credentialUuid);
    if (!credential) throw new Error('resource_not_found');

    return credential as KdbxCredential;
  }

  /**
   * Creates a credential
   */
  async putCredential(credential: Credential): Promise<{ uuid: string; }> {
    logger.debug(`[Module Credentials] -> putCredential -> userUuid [${this.userUuid}], description [${credential.description}]`);

    const group: Group = loadedDbs[this.workspaceUuid].getDefaultGroup();
    const entry: Entry = loadedDbs[this.workspaceUuid].createEntry(group);

    this.setEntryFields(entry, credential);
    this.saveDb();

    // @ts-ignore TODO
    return { uuid: entry.uuid.id };
  }

  /**
   * Edits a credential by uuid
   */
  async patchCredential(credentialUuid: string, credential: Credential): Promise<{ uuid: string; }> {
    logger.debug(`[Module Credentials] -> patchCredential -> userUuid [${this.userUuid}], credentialUuid [${credential.uuid}], credentialUuid [${credentialUuid}], description [${credential.description}]`);

    const entry: Entry = await this.getCredential(credential.uuid);
    if (!entry) throw new Error('resource_not_found');

    this.setEntryFields(entry, credential);
    await this.saveDb();

    return { uuid: credential.uuid };
  }

  /**
   * Sets field values for an entry
   */
  private setEntryFields(entry: Entry, credential: Credential) {
    entry.fields.Title = credential.description;
    entry.fields.UserName = credential.username;
    // @ts-ignore TODO
    entry.fields.Password = ProtectedValue.fromString(credential.password);
    entry.fields.Type = credential.type;
  }

  /**
   * Deletes a credential by uuid
   */
  async deleteCredential(credentialUuid: string): Promise<void> {
    logger.debug(`[Module Credentials] -> deleteCredential -> userUuid [${this.userUuid}], credentialUuid [${credentialUuid}]`);

    const entry = await this.getCredential(credentialUuid,);
    if (!entry) throw new Error('resource_not_found');

    loadedDbs[this.workspaceUuid].remove(entry);

    return this.saveDb();
  }

}
