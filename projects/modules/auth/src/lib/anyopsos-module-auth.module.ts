import {getLogger, Logger} from 'log4js';
import {v4 as uuidv4} from 'uuid';
import {client} from 'node-vault';

import {AnyOpsOSVaultModule} from '@anyopsos/module-vault';

import {User} from './types/user';


const logger: Logger = getLogger('auth');

/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * When modifying this module, make sure you check that userUuid & sessionUuid from the Class Constructor provided data
 * Those are not mandatory since the function {@link authenticateUser} doesn't use it
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * This module will only work inside 'anyopsos-auth' Pod since it uses the Kubernetes Pod Service Account to login with Vault
 */
export class AnyOpsOSAuthModule {

  private readonly VaultModule: AnyOpsOSVaultModule = new AnyOpsOSVaultModule();
  private readonly vaultClient: client = this.VaultModule.getVaultClient();

  private validPrivilegedUser: boolean = false;

  constructor(private readonly userUuid?: string,
              private readonly sessionUuid?: string) {

    // TODO: check if matches
    if (this.userUuid && this.sessionUuid) this.validPrivilegedUser = true;
  }

  /**
   * Returns a user and its data
   */
  private async geUserDetail(username: string): Promise<User> {
    logger.trace(`[Module Vault] -> geUserDetail`);

    return this.vaultClient.read(`/auth/userpass/users/${username}`);
  }

  /**
   * Main function to authenticate a user
   * TODO params needs to be extra sanitized (length, characters, convert to string, ...)
   */
  async authenticateUser(username: string, password: string): Promise<{ successLogin: boolean; userUuid: string; }> {
    logger.debug(`[Module Auth] -> authenticateUser -> username [${username}]`);

    // Check if user not exists
    const users: string[] = await this.VaultModule.getUsersList();
    if (!users.includes(username)) {
      logger.warn(`[Module Vault] -> geUserDetail -> Invalid Username -> username [${username}]`);
      throw new Error('resource_not_found');
    }

    const user: User = await this.geUserDetail(username);

    // Check login against Vault
    const successLogin: boolean = await this.vaultClient.userpassLogin({ username, password });
    if (!successLogin) {
      logger.warn(`[Module Vault] -> geUserDetail -> Invalid Password -> username [${username}]`);
      throw new Error('resource_invalid');
    }

    return {
      successLogin,
      userUuid: user.uuid
    }
  }

  /**
   * From here, we must make sure that we are allowed to access/modify the user/s information by using the Class Constructor provided data {@link validPrivilegedUser}
   * --------
   */

  /**
   * We have to make sure that the user requesting a new user have the required privileges to perform this action
   */
  async createUser(username: string): Promise<{ successCreated: boolean; userUuid: string; password: string; }> {
    logger.debug(`[Module Auth] -> createUser -> username [${username}]`);

    const users: string[] = await this.VaultModule.getUsersList();

    // Allow to create the first user (when initializing the vault)
    if (users.length !== 0  && !this.validPrivilegedUser) {
      logger.warn(`[Module Auth] -> createUser -> Insufficient permissions to create a User [${username}] -> userUuid [${this.userUuid}]`);
      throw new Error('action_not_allowed');
    }
    // TODO: get user role and if is allowed to create users

    // Check if user already exists
    if (users.includes(username)) throw new Error('resource_already_exists');

    // Generate new random password & uuid
    const password: string = await this.vaultClient.tokenCreate();
    const userUuid: string = uuidv4();

    // TODO: create user folders
    // TODO: change Shadow file

    // Insert user into Vault
    const successCreated: boolean = await this.vaultClient.write(`auth/userpass/users/${username}`, { password });
    if (!successCreated) throw new Error('resource_invalid');

    logger.info(`[Module Auth] -> createUser -> New User created [${username}] -> userUuid [${this.userUuid}]`);

    return {
      successCreated,
      userUuid,
      password
    }
  }

}
