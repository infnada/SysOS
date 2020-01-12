import {Controller, Get, Authorized, Req, Res, Post, BodyParam} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSConfigFileModule} from '@anyopsos/module-config-file';
import {AnyOpsOSGetPathModule} from '@anyopsos/module-get-path';
import {AnyOpsOSCredentialModule, User} from '@anyopsos/module-credential';

const logger = getLogger('mainlog');

@Controller('/api/auth')
export class AnyOpsOSAuthApiController {

  @Authorized()
  @Get('/')
  getAuth(@Req() request: Request,
          @Res() response: Response) {
    logger.info(`[API auth] -> Check auth`);

    return new AnyOpsOSApiGlobalsModule(request, response).validResponse();
  }

  @Post('/')
  async login(@Req() request: Request,
              @Res() response: Response,
              @SessionParam('id') sessionUuid: string,
              @BodyParam('username') username: string,
              @BodyParam('password') password: string) {
    logger.info(`[API auth] -> Login -> user [${username}]`);

    const mainConfig: { [key: string]: any; } = await new AnyOpsOSConfigFileModule().get(new AnyOpsOSGetPathModule().mainConfig);
    // @ts-ignore TODO
    const users: User[] = await new AnyOpsOSConfigFileModule().get(new AnyOpsOSGetPathModule().shadow);
    const user: User = users.find((usr: User) => usr.username === username);
    if (!user) return new AnyOpsOSApiGlobalsModule(request, response).invalidResponse('resource_not_found');

    const successLoad: boolean = await new AnyOpsOSCredentialModule().loadCredentialDb(user.uuid, sessionUuid, password, user.kdbxPath);
    if (!successLoad) return new AnyOpsOSApiGlobalsModule(request, response).invalidResponse('resource_invalid');

    // Logged in!
    request.session.userUuid = user.uuid;
    response.cookie(mainConfig.uniqueCookie, user.uuid, {signed: true});

    return new AnyOpsOSApiGlobalsModule(request, response).validResponse();
  }

}
