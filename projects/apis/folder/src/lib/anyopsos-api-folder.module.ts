import {Controller, Get, Authorized, Req, Res, Param, Put} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSFileSystemModule} from '@anyopsos/module-file-system';
import {AnyOpsOSFile} from '@anyopsos/backend-core/app/types/anyopsos-file';


const logger: Logger = getLogger('mainLog');

@Authorized()
@Controller('/api/folder')
export class AnyOpsOSFolderApiController {

  @Get('/:srcPath')
  async getFolder(@Req() request: Request,
                  @Res() response: Response,
                  @SessionParam('userUuid') userUuid: string,
                  @SessionParam('id') sessionUuid: string,
                  @Param('srcPath') srcPath: string) {
    logger.info(`[API Folder] -> Reading folder files -> srcPath [${srcPath}]`);

    const FileSystemModule: AnyOpsOSFileSystemModule = new AnyOpsOSFileSystemModule(userUuid, sessionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    if (!srcPath.endsWith('/')) srcPath += '/';

    const pathData: AnyOpsOSFile[] = await FileSystemModule.getFolder(srcPath);

    return ApiGlobalsModule.jsonDataResponse(pathData);
  }

  @Put('/:dstPath')
  async createFolder(@Req() request: Request,
                     @Res() response: Response,
                     @SessionParam('userUuid') userUuid: string,
                     @SessionParam('id') sessionUuid: string,
                     @Param('dstPath') dstPath: string) {
    logger.info(`[API Folder] -> Creating folder -> dstPath [${dstPath}]`);

    const FileSystemModule: AnyOpsOSFileSystemModule = new AnyOpsOSFileSystemModule(userUuid, sessionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    await FileSystemModule.putFolder(dstPath);

    return ApiGlobalsModule.validResponse();
  }

}
