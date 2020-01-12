import {Credentials, Entry, Group, Kdbx, ProtectedValue} from 'kdbxweb';
import {outputFile, readFile} from 'fs-extra';
import {join} from 'path';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSGetPathModule} from '@anyopsos/module-get-path';
import {AnyOpsOSConfigFileModule} from '@anyopsos/module-config-file';

import {UserToSessionToDbMap} from './types/user-to-session-to-db-map';
import {KdbxCredential} from './types/kxdb-credential';
import {Credential} from './types/credential';

const logger: Logger = getLogger('mainlog');
const loadedDbs: UserToSessionToDbMap = {};

export class AnyOpsOSCredentialModule {

  /**
   * Saves the DB on disk
   * TODO (SECURITY) anyone can "override" any db
   */
  private async saveDb(db: Kdbx, userUuid: string): Promise<void> {
    logger.debug(`[Module Credentials] -> saveDb -> userUuid [${userUuid}]`);

    // @ts-ignore TODO
    const user: User = await new AnyOpsOSConfigFileModule().get(new AnyOpsOSGetPathModule().shadow, userUuid);
    const dataAsArrayBuffer: ArrayBuffer = await db.save();

    return outputFile(join(new AnyOpsOSGetPathModule().filesystem, user.kdbxPath), Buffer.from(dataAsArrayBuffer));
  }

  /**
   * Creates new KeePass empty database
   * TODO check if user already exists on shadow.json and if dbfile already exists
   * TODO (SECURITY) anyone can "flush" any db
   */
  async createNewDb(userUuid: string, name: string): Promise<void> {
    logger.debug(`[Module Credentials] -> createNewDb -> userUuid [${userUuid}], name [${name}]`);

    // @ts-ignore - NO KEYFILE (2nd argument)
    const credentials: Credentials = new Credentials(ProtectedValue.fromString('root'));
    const db: Kdbx = Kdbx.create(credentials, name);

    return this.saveDb(db, userUuid);
  }

  /**
   * Loads a KeePass database in memory
   * TODO: (SECURITY) all db is loaded in memory...
   */
  async loadCredentialDb(userUuid: string, sessionUuid: string, password: string, kdbxPath: string): Promise<boolean> {
    logger.debug(`[Module Credentials] -> loadCredentialDb -> userUuid [${userUuid}], kdbxPath [${kdbxPath}]`);

    const dataAsArrayBuffer = await readFile(join(new AnyOpsOSGetPathModule().filesystem, kdbxPath));

    // @ts-ignore - NO KEYFILE (2nd argument)
    const credentials: Credentials = new Credentials(ProtectedValue.fromString(password));

    return Kdbx.load(dataAsArrayBuffer.buffer, credentials).then((db: Kdbx) => {

      if (!loadedDbs[userUuid]) loadedDbs[userUuid] = {};
      loadedDbs[userUuid][sessionUuid] = db;
      return true;
    }).catch((e) => {
      console.log(e);
      return false;
    });
  }

  /**
   * Gets all credentials but without protected values
   */
  async getCredentials(userUuid: string, sessionUuid: string): Promise<Credential[]> {
    logger.debug(`[Module Credentials] -> getCredentials -> userUuid [${userUuid}]`);

    const credentials: Credential[] = [];
    await loadedDbs[userUuid][sessionUuid].getDefaultGroup().entries.forEach((entry: Entry) => {
      credentials.push({
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
  async getCredential(userUuid: string, sessionUuid: string, credentialUuid: string): Promise<KdbxCredential> {
    logger.debug(`[Module Credentials] -> getCredentials -> userUuid [${userUuid}], credentialUuid [${credentialUuid}]`);

    const credential = loadedDbs[userUuid][sessionUuid].getDefaultGroup().entries.find((entry: Entry) => entry.uuid.id === credentialUuid);
    if (!credential) throw new Error('resource_not_found');

    return credential as KdbxCredential;
  }

  /**
   * Creates a credential
   */
  async newCredential(userUuid: string, sessionUuid: string, credential: Credential): Promise<{ uuid: string; }> {
    logger.debug(`[Module Credentials] -> newCredential -> userUuid [${userUuid}], description [${credential.description}]`);

    const group: Group = loadedDbs[userUuid][sessionUuid].getDefaultGroup();
    const entry: Entry = loadedDbs[userUuid][sessionUuid].createEntry(group);

    this.setEntryFields(entry, credential);
    this.saveDb(loadedDbs[userUuid][sessionUuid], userUuid);

    return { uuid: entry.uuid.id };
  }

  /**
   * Edits a credential by uuid
   */
  async editCredential(userUuid: string, sessionUuid: string, credential: Credential): Promise<{ uuid: string; }> {
    logger.debug(`[Module Credentials] -> editCredential -> userUuid [${userUuid}], credentialUuid [${credential.uuid}], description [${credential.description}]`);

    const entry: Entry = await this.getCredential(userUuid, sessionUuid, credential.uuid);
    if (!entry) throw new Error('resource_not_found');

    this.setEntryFields(entry, credential);
    await this.saveDb(loadedDbs[userUuid][sessionUuid], userUuid);

    return { uuid: credential.uuid };
  }

  /**
   * Sets field values for an entry
   */
  private setEntryFields(entry: Entry, credential: Credential) {
    entry.fields.Title = credential.description;
    entry.fields.UserName = credential.username;
    entry.fields.Password = ProtectedValue.fromString(credential.password);
    entry.fields.Type = credential.type;
  }

  /**
   * Deletes a credential by uuid
   */
  async deleteCredential(userUuid: string, sessionUuid: string, credentialUuid: string): Promise<void> {
    logger.debug(`[Module Credentials] -> deleteCredential -> userUuid [${userUuid}], credentialUuid [${credentialUuid}]`);

    const entry = await this.getCredential(userUuid, sessionUuid, credentialUuid);
    if (!entry) throw new Error('resource_not_found');

    loadedDbs[userUuid][sessionUuid].remove(entry);

    return this.saveDb(loadedDbs[userUuid][sessionUuid], userUuid);
  }

}
