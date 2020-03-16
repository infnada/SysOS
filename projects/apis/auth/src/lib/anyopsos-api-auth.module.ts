import {Controller, Get, Authorized, Req, Res, Post, BodyParam, Put} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger} from 'log4js';

import {AOO_UNIQUE_COOKIE_NAME} from '@anyopsos/module-sys-constants';
import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSAuthModule} from '@anyopsos/module-auth';


const logger = getLogger('mainLog');


/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * When modifying this API make sure to add the @Authorized() Decorator. Only the main Post request should not use it since its the main login API
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
@Controller('/api/auth')
export class AnyOpsOSAuthApiController {

  /**
   * This path will return success if the user is @Authorized() (logged in) otherwise it will fail
   */
  @Authorized()
  @Get('/')
  getAuth(@Req() request: Request,
          @Res() response: Response) {
    logger.info(`[API auth] -> Check auth`);

    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    return ApiGlobalsModule.validResponse();
  }

  /**
   * Authenticates a user with a given username:password
   * TODO: prevent brute force attacks to discover keys
   * TODO: throttle
   * TODO: if unsealing with wrong or correct key have different response times, return a response after random milliseconds
   */
  @Post('/')
  async login(@Req() request: Request,
              @Res() response: Response,
              @SessionParam('id') sessionUuid: string,
              @BodyParam('username') username: string,
              @BodyParam('password') password: string) {
    logger.info(`[API auth] -> Login -> user [${username}]`);

    const AuthModule: AnyOpsOSAuthModule = new AnyOpsOSAuthModule();
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const loginResult: { successLogin: boolean; userUuid: string; } = await AuthModule.authenticateUser(username, password);
    if (!loginResult.successLogin) return ApiGlobalsModule.invalidResponse('resource_invalid');

    // Logged in!
    request.session!.userUuid = loginResult.userUuid;
    response.cookie(AOO_UNIQUE_COOKIE_NAME, loginResult.userUuid, { signed: true });

    return ApiGlobalsModule.validResponse();
  }

  /**
   * Creates a new user
   */
  @Authorized()
  @Put('/')
  async createUser(@Req() request: Request,
                   @Res() response: Response,
                   @SessionParam('userUuid') userUuid: string,
                   @SessionParam('id') sessionUuid: string,
                   @BodyParam('username') username: string) {
    logger.info(`[API auth] -> createUser -> user [${username}]`);

    const AuthModule: AnyOpsOSAuthModule = new AnyOpsOSAuthModule(userUuid, sessionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const createResult: { successCreated: boolean; userUuid: string; } = await AuthModule.createUser(username);
    if (!createResult.successCreated) return ApiGlobalsModule.invalidResponse('resource_invalid');

    return ApiGlobalsModule.jsonDataResponse({
      userUuid: createResult.userUuid
    });
  }

}
