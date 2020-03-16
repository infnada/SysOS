import {configure, getLogger, Logger} from 'log4js';
import {client} from 'node-vault';

import {AnyOpsOSVaultModule, VaultState} from '@anyopsos/module-vault'


const logger: Logger = getLogger('mainLog');

export class Init {

  private VaultModule: AnyOpsOSVaultModule = new AnyOpsOSVaultModule();

  constructor() {
    configure({
      appenders: {
        console: {type: 'console', level: 'trace'}
      },
      categories: {
        default: {appenders: ['console'], level: 'trace'},
        mainLog: {appenders: ['console'], level: 'trace'},
        auth: {appenders: ['console'], level: 'trace'},
        credential: {appenders: ['console'], level: 'trace'},
        vault: {appenders: ['console'], level: 'trace'}
      }
    });
  }

  /**
   * Main function that launch all system checks
   */
  public async initialize(): Promise<void> {
    logger.trace(`[Auth] -> initialize`);

    const vaultClient: client = this.VaultModule.getVaultClient();

    // Try to get state of the Vault server
    const vaultStatus: VaultState = await this.VaultModule.getVaultState();

    if (!vaultStatus.sealed && !vaultClient.token) {
      logger.info(`[Auth] -> Login Pod into Vault`);
      await this.VaultModule.loginVault();
    }

  }
}
