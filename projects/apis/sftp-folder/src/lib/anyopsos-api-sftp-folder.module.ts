import {Controller, Get, Authorized, Req, Res, Param, Put} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSSshFileSystemModule} from '@anyopsos/module-ssh';
import {AnyOpsOSFile} from '@anyopsos/backend-core/app/types/anyopsos-file';


const logger: Logger = getLogger('mainLog');

@Authorized()
@Controller('/api/sftp-folder')
export class AnyOpsOSRemoteFolderApiController {

  @Get('/:workspaceUuid/:connectionUuid/:srcPath')
  async getRemoteFolder(@Req() request: Request,
                        @Res() response: Response,
                        @SessionParam('userUuid') userUuid: string,
                        @SessionParam('id') sessionUuid: string,
                        @Param('workspaceUuid') workspaceUuid: string,
                        @Param('connectionUuid') connectionUuid: string,
                        @Param('srcPath') srcPath: string) {
    logger.info(`[API RemoteFolder] -> Reading folder files -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], srcPath [${srcPath}]`);

    const SshFileSystemModule: AnyOpsOSSshFileSystemModule = new AnyOpsOSSshFileSystemModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const pathData: AnyOpsOSFile[] = await SshFileSystemModule.getFolder(srcPath);

    return ApiGlobalsModule.jsonDataResponse(pathData);
  }

  @Put('/:workspaceUuid/:connectionUuid/:dstPath')
  async createRemoteFolder(@Req() request: Request,
                           @Res() response: Response,
                           @SessionParam('userUuid') userUuid: string,
                           @SessionParam('id') sessionUuid: string,
                           @Param('workspaceUuid') workspaceUuid: string,
                           @Param('connectionUuid') connectionUuid: string,
                           @Param('dstPath') dstPath: string) {
    logger.info(`[API RemoteFolder] -> Creating folder -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], dstPath [${dstPath}]`);

    const SshFileSystemModule: AnyOpsOSSshFileSystemModule = new AnyOpsOSSshFileSystemModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    await SshFileSystemModule.putFolder(dstPath);

    return ApiGlobalsModule.validResponse();
  }

}
