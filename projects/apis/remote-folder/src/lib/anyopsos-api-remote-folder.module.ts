import {Controller, Get, Authorized, Req, Res, Param, Put} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSFileSystemModule} from '@anyopsos/module-file-system';
import {AnyOpsOSFile} from '@anyopsos/backend/app/types/anyopsos-file';


const logger: Logger = getLogger('mainlog');

@Authorized()
@Controller('/api/remote-folder')
export class AnyOpsOSRemoteFolderApiController {

  @Get('/:connectionUuid/:folderName')
  async getRemoteFolder(@Req() request: Request,
                        @Res() response: Response,
                        @SessionParam('userUuid') userUuid: string,
                        @SessionParam('id') sessionUuid: string,
                        @Param('connectionUuid') connectionUuid: string,
                        @Param('folderName') folderName: string) {
    logger.info(`[API RemoteFolder] -> Reading folder files -> connectionUuid [${connectionUuid}], folder [${folderName}]`);

    const pathData: AnyOpsOSFile[] = await new AnyOpsOSFileSystemModule(userUuid, sessionUuid).getFolder(folderName, connectionUuid);
    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(pathData);
  }

  @Put('/:connectionUuid/:folderName')
  async createRemoteFolder(@Req() request: Request,
                           @Res() response: Response,
                           @SessionParam('userUuid') userUuid: string,
                           @SessionParam('id') sessionUuid: string,
                           @Param('connectionUuid') connectionUuid: string,
                           @Param('folderName') folderName: string) {
    logger.info(`[API RemoteFolder] -> Creating folder -> connectionUuid [${connectionUuid}], folder [${folderName}]`);

    await new AnyOpsOSFileSystemModule(userUuid, sessionUuid).putFolder(folderName, connectionUuid);
    return new AnyOpsOSApiGlobalsModule(request, response).validResponse();
  }

}
