import {Controller, Get, Authorized, Req, Res, Param, Put} from 'routing-controllers';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';
import {join} from 'path';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSGetPathModule} from '@anyopsos/module-get-path';
import {AnyOpsOSFileSystemModule} from '@anyopsos/module-file-system';
import {AnyOpsOSFile} from '@anyopsos/backend/app/types/anyopsos-file';

const logger: Logger = getLogger('mainlog');

@Authorized()
@Controller('/api/folder')
export class AnyOpsOSFolderApiController {

  @Get('/:folderName')
  async getFolder(@Req() request: Request,
                  @Res() response: Response,
                  @Param('folderName') folderName: string) {
    logger.info(`[API Folder] -> Reading folder files -> folder [${folderName}]`);

    if (!folderName.endsWith('/')) folderName += '/';
    const folderPath: string = join(new AnyOpsOSGetPathModule().filesystem, folderName);

    const pathData: AnyOpsOSFile[] = await new AnyOpsOSFileSystemModule().getFolder(folderPath);
    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(pathData);
  }

  @Put('/:folderName')
  async createFolder(@Req() request: Request,
                     @Res() response: Response,
                     @Param('folderName') folderName: string) {
    logger.info(`[API Folder] -> Creating folder -> folder [${folderName}]`);

    const folderPath: string = join(new AnyOpsOSGetPathModule().filesystem, folderName);

    await new AnyOpsOSFileSystemModule().putFolder(folderPath);
    return new AnyOpsOSApiGlobalsModule(request, response).validResponse();
  }

}
