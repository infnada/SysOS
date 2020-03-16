import {BodyParam, Controller, Get, Post, Req, Res} from 'routing-controllers';
import {Request, Response} from 'express';
import {getLogger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSVaultModule, VaultState} from '@anyopsos/module-vault';
import {AnyOpsOSAuthModule} from '@anyopsos/module-auth';


const logger = getLogger('mainLog');

/**
 * This API is not authorized, which means anyone can use it
 * We must be 100% safe since this API acts directly against the Vault
 * All params have to be validated, escaped, ...
 */
@Controller('/api/vault')
export class AnyOpsOSVaultApiController {

  /**
   * Returns the state of the Vault (initialized, unsealed, number of users)
   */
  @Get('/')
  async getVaultState(@Req() request: Request,
                      @Res() response: Response) {
    logger.info(`[API vault] -> getVaultState`);

    const VaultModule: AnyOpsOSVaultModule = new AnyOpsOSVaultModule();

    const vaultState: VaultState = await VaultModule.getVaultState();

    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(vaultState);
  }

  /**
   * !!!!!!!!!!!!!!!!!
   * Initialize the Vault, it will return sensitive data (keys for unsealing and the root password)
   * It will create the first anyOpsOS user
   * This API will not work if the Vault is already initialized. On Shot.
   */
  @Post('/initialize')
  async initializeVault(@Req() request: Request,
                        @Res() response: Response,
                        @BodyParam('username') username: string) {
    logger.info(`[API vault] -> initializeVault`);

    const VaultModule: AnyOpsOSVaultModule = new AnyOpsOSVaultModule();
    const AuthModule: AnyOpsOSAuthModule = new AnyOpsOSAuthModule();

    const vaultData: { keys: string[]; keys_base64: string[]; root_token: string; } = await VaultModule.initializeVault();
    const userData: { successCreated: boolean; userUuid: string; password: string; } = await AuthModule.createUser(username);

    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse({...vaultData, ...userData});
  }

  /**
   * Tries to unseal the Vault with a key
   * https://www.vaultproject.io/docs/concepts/seal/
   * TODO: prevent brute force attacks to discover keys
   * TODO: throttle
   * TODO: if unsealing with wrong or correct key have different response times, return a response after random milliseconds
   */
  @Post('/unseal')
  async unsealVault(@Req() request: Request,
                    @Res() response: Response,
                    @BodyParam('key') key: string) {
    logger.info(`[API vault] -> unsealVault`);

    const VaultModule: AnyOpsOSVaultModule = new AnyOpsOSVaultModule();

    const vaultState: { initialized: boolean; sealed: boolean; } = await VaultModule.unsealVault(key);

    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(vaultState);
  }

}
