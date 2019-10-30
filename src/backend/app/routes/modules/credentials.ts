import {Kdbx, Credentials, ProtectedValue, Entry, Group} from 'kdbxweb';
import {outputFile, readFile} from 'fs-extra';
import * as path from 'path';
import readConfig from 'read-config';

const loadedDbs: Kdbx[] = [];

export class CredentialsModule {

  constructor() {

  }

  /**
   * Saves the DB on disk
   */
  private saveDb(db: Kdbx, userUuid: string) {
    const users = readConfig(path.join(__dirname, '../../filesystem/etc/shadow.json'));
    const user = users.find((obj) => {
      return obj.uuid === userUuid;
    });

    return db.save().then(dataAsArrayBuffer => {
      return outputFile(path.join(__dirname, '../../filesystem' + user.kdbxPath), Buffer.from(dataAsArrayBuffer));
    });
  }

  /**
   * Creates new KeePass empty database
   */
  async createNewDb(userUuid: string, name: string): Promise<void> {
    // @ts-ignore
    const credentials = new Credentials(ProtectedValue.fromString('root'));
    const db = Kdbx.create(credentials, name);
    return this.saveDb(db, userUuid);
  }

  /**
   * Loads a KeePass database in memory
   * TODO: this is not MEMORY safe...
   */
  async loadCredentialDb(userUuid: string, password: string, dbPath: string): Promise<boolean> {
    // @ts-ignore
    const dataAsArrayBuffer = await readFile(path.join(__dirname, '../../filesystem' + dbPath));
    // @ts-ignore
    const credentials = new Credentials(ProtectedValue.fromString(password));

    return Kdbx.load(dataAsArrayBuffer.buffer, credentials).then((db) => {
      loadedDbs[userUuid] = db;
      return true;
    }).catch((e) => {
      console.log(e);
      return false;
    });
  }

  /**
   * Gets all credentials but without protected values
   */
  async getCredentials(userUuid: string): Promise<any> {
    const credentials = [];

    await loadedDbs[userUuid].getDefaultGroup().entries.forEach((credential) => {
      credentials.push({
        uuid: credential.uuid.id,
        description: credential.fields.Title,
        username: credential.fields.UserName,
        type: credential.fields.Type
      });
    });

    return credentials;
  }

  /**
   * Gets a credential by uuid
   */
  async getCredential(userUuid: string, credentialUuid: string): Promise<any> {
    const credential = loadedDbs[userUuid].getDefaultGroup().entries.find((cred: Entry) => {
      return cred.uuid.id === credentialUuid;
    });

    if (!credential) throw new Error('Credential not found');

    return credential;
  }

  /**
   * Creates a credential
   */
  async newCredential(userUuid: string, credential): Promise<string> {
    const group: Group = loadedDbs[userUuid].getDefaultGroup();
    const entry: Entry = loadedDbs[userUuid].createEntry(group);

    this.setEntryFields(entry, credential);
    this.saveDb(loadedDbs[userUuid], userUuid);

    return entry.uuid.id;
  }

  /**
   * Edits a credential by uuid
   */
  async editCredential(userUuid: string, credential): Promise<void> {
    const entry: Entry = await this.getCredential(userUuid, credential.uuid);

    if (!entry) throw new Error('Credential not found');

    this.setEntryFields(entry, credential);
    return this.saveDb(loadedDbs[userUuid], userUuid);
  }

  /**
   * Sets field values for an entry
   */
  private setEntryFields(entry: Entry, credential) {
    entry.fields.Title = credential.description;
    entry.fields.UserName = credential.username;
    entry.fields.Password = ProtectedValue.fromString(credential.password);
    entry.fields.Type = credential.type;
  }

  /**
   * Deletes a credential by uuid
   */
  async deleteCredential(userUuid: string, credentialUuid: string): Promise<void> {
    const entry = await this.getCredential(userUuid, credentialUuid);

    if (!entry) throw new Error('Credential not found');

    loadedDbs[userUuid].remove(entry);

    this.saveDb(loadedDbs[userUuid], userUuid);
  }
}
