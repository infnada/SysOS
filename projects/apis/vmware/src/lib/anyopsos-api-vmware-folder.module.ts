import {Controller, Get, Authorized, Req, Res, Param, Put} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSNodeVmwareFileSystemModule} from '@anyopsos/module-node-vmware';
import {AnyOpsOSFile} from '@anyopsos/backend-core/app/types/anyopsos-file';


const logger: Logger = getLogger('mainLog');

// TODO
@Authorized()
@Controller('/api/vmware-folder')
export class AnyOpsOSVmwareFolderApiController {

  @Get('/:workspaceUuid/:connectionUuid/:srcPath/:datastoreName/:datastoreBrowserName')
  async getVmwareFolder(@Req() request: Request,
                        @Res() response: Response,
                        @SessionParam('userUuid') userUuid: string,
                        @SessionParam('id') sessionUuid: string,
                        @Param('workspaceUuid') workspaceUuid: string,
                        @Param('connectionUuid') connectionUuid: string,
                        @Param('srcPath') srcPath: string,
                        @Param('datastoreName') datastoreName: string,
                        @Param('datastoreBrowserName') datastoreBrowserName: string) {
    logger.info(`[API VmwareFolder] -> Reading folder files -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], srcPath [${srcPath}]`);

    const VmwareFileSystemModule: AnyOpsOSNodeVmwareFileSystemModule = new AnyOpsOSNodeVmwareFileSystemModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const pathData: AnyOpsOSFile[] = await VmwareFileSystemModule.getFolder(srcPath, datastoreName, datastoreBrowserName);

    return ApiGlobalsModule.jsonDataResponse(pathData);
  }

  @Put('/:workspaceUuid/:connectionUuid/:dstPath')
  async createVmwareFolder(@Req() request: Request,
                           @Res() response: Response,
                           @SessionParam('userUuid') userUuid: string,
                           @SessionParam('id') sessionUuid: string,
                           @Param('workspaceUuid') workspaceUuid: string,
                           @Param('connectionUuid') connectionUuid: string,
                           @Param('dstPath') dstPath: string,
                           @Param('datastoreName') datastoreName: string,
                           @Param('datacenterName') datacenterName: string) {
    logger.info(`[API VmwareFolder] -> Creating folder -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], dstPath [${dstPath}]`);

    const VmwareFileSystemModule: AnyOpsOSNodeVmwareFileSystemModule = new AnyOpsOSNodeVmwareFileSystemModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    await VmwareFileSystemModule.putFolder(dstPath, datastoreName, datacenterName);

    return ApiGlobalsModule.validResponse();
  }

}
