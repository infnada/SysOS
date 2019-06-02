import path from 'path';
import readConfig from 'read-config';

export class CredentialsModule {

  constructor() {

  }

  async getCredential(credential) {
    const credentials = await readConfig(path.join(__dirname, '../../filesystem/root/credentials.json'));

    credential = credentials.saved_credentials.filter((obj) => {
      return obj.uuid === credential;
    })[0];

    if (!credential) { return 'Invalid credential'; }

    return credential;
  }

}
