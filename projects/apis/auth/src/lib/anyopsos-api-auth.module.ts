import {Controller, Get, Authorized, Req, Res, Post, BodyParam} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSConfigFileModule} from '@anyopsos/module-config-file';
import {AnyOpsOSGetPathModule} from '@anyopsos/module-get-path';
import {AnyOpsOSCredentialModule, User} from '@anyopsos/module-credential';
import {AnyOpsOSWorkspaceModule} from '@anyopsos/module-workspace';

const logger = getLogger('mainLog');

@Controller('/api/auth')
export class AnyOpsOSAuthApiController {

  @Authorized()
  @Get('/')
  getAuth(@Req() request: Request,
          @Res() response: Response) {
    logger.info(`[API auth] -> Check auth`);

    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    return ApiGlobalsModule.validResponse();
  }

  @Post('/')
  async login(@Req() request: Request,
              @Res() response: Response,
              @SessionParam('id') sessionUuid: string,
              @BodyParam('username') username: string,
              @BodyParam('password') password: string) {
    logger.info(`[API auth] -> Login -> user [${username}]`);

    const ConfigFileModule: AnyOpsOSConfigFileModule = new AnyOpsOSConfigFileModule();
    const GetPathModule: AnyOpsOSGetPathModule = new AnyOpsOSGetPathModule();
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const mainConfig: { [key: string]: any; } = await ConfigFileModule.get(GetPathModule.mainConfig);

    const users: User[] = await ConfigFileModule.get(GetPathModule.shadow) as User[];
    const user: User | undefined = users.find((usr: User) => usr.username === username);
    if (!user) return ApiGlobalsModule.invalidResponse('resource_not_found');

    const WorkspaceModule: AnyOpsOSWorkspaceModule = new AnyOpsOSWorkspaceModule(user.uuid, sessionUuid);

    // If no workspaceUuid is provided, load the default one
    const workspaceUuid: string = WorkspaceModule.getDefaultWorkspaceUuid();

    const CredentialModule: AnyOpsOSCredentialModule = new AnyOpsOSCredentialModule(user.uuid, sessionUuid, workspaceUuid);

    const successLoad: boolean = await CredentialModule.loadCredentialDb(password);
    if (!successLoad) return ApiGlobalsModule.invalidResponse('resource_invalid');

    // Logged in!
    // @ts-ignore TODO
    request.session.userUuid = user.uuid;
    response.cookie(mainConfig.uniqueCookie, user.uuid, {signed: true});

    return ApiGlobalsModule.validResponse();
  }

}
