import {Controller, Get, Authorized, Req, Res, Param, Put} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSNodeNetappFileSystemModule} from '@anyopsos/module-node-netapp';
import {AnyOpsOSFile} from '@anyopsos/backend-core/app/types/anyopsos-file';


const logger: Logger = getLogger('mainLog');

// TODO
@Authorized()
@Controller('/api/vmware-folder')
export class AnyOpsOSVmwareFolderApiController {

  @Get('/:workspaceUuid/:connectionUuid/:vfiler/:srcPath')
  async getVmwareFolder(@Req() request: Request,
                        @Res() response: Response,
                        @SessionParam('userUuid') userUuid: string,
                        @SessionParam('id') sessionUuid: string,
                        @Param('workspaceUuid') workspaceUuid: string,
                        @Param('connectionUuid') connectionUuid: string,
                        @Param('vfiler') vfiler: string,
                        @Param('srcPath') srcPath: string) {
    logger.info(`[API VmwareFolder] -> Reading folder files -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], srcPath [${srcPath}]`);

    const NetappFileSystemModule: AnyOpsOSNodeNetappFileSystemModule = new AnyOpsOSNodeNetappFileSystemModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const pathData: AnyOpsOSFile[] = await NetappFileSystemModule.getFolder(vfiler, srcPath);

    return ApiGlobalsModule.jsonDataResponse(pathData);
  }

  @Put('/:workspaceUuid/:connectionUuid/:vfiler/:dstPath')
  async createVmwareFolder(@Req() request: Request,
                           @Res() response: Response,
                           @SessionParam('userUuid') userUuid: string,
                           @SessionParam('id') sessionUuid: string,
                           @Param('workspaceUuid') workspaceUuid: string,
                           @Param('connectionUuid') connectionUuid: string,
                           @Param('vfiler') vfiler: string,
                           @Param('dstPath') dstPath: string) {
    logger.info(`[API VmwareFolder] -> Creating folder -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], dstPath [${dstPath}]`);

    const NetappFileSystemModule: AnyOpsOSNodeNetappFileSystemModule = new AnyOpsOSNodeNetappFileSystemModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    await NetappFileSystemModule.putFolder(vfiler, dstPath);

    return ApiGlobalsModule.validResponse();
  }

}
