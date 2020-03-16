import {Controller, Authorized, Req, Res, Param, BodyParam, Patch, Delete, Put, Get} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';
import {EventEmitter} from 'events';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSNodeVmwareFileSystemModule} from '@anyopsos/module-node-vmware';


const logger: Logger = getLogger('mainLog');

// TODO
@Authorized()
@Controller('/api/vmware-file')
export class AnyOpsOSVmwareFileApiController {

  @Get('/:workspaceUuid/:connectionUuid/:srcPath/:dstPath')
  async downloadFile(@Req() request: Request,
                     @Res() response: Response,
                     @SessionParam('userUuid') userUuid: string,
                     @SessionParam('id') sessionUuid: string,
                     @Param('workspaceUuid') workspaceUuid: string,
                     @Param('connectionUuid') connectionUuid: string,
                     @Param('srcPath') srcPath: string,
                     @Param('dstPath') dstPath: string) {
    logger.info(`[API VmwareFile] -> Download file -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], srcPath [${srcPath}], dstPath [${dstPath}]`);

    const VmwareFileSystemModule: AnyOpsOSNodeVmwareFileSystemModule = new AnyOpsOSNodeVmwareFileSystemModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const percentageEvent: EventEmitter = await VmwareFileSystemModule.getFile(srcPath, dstPath);

    percentageEvent
      .on('data', (percentage: number) => {
        return response.write(percentage);
      }).on('removeListener', () => {
        return ApiGlobalsModule.validResponse();
      });
  }

  @Put('/:workspaceUuid/:connectionUuid/:srcPath/:dstPath')
  async uploadFile(@Req() request: Request,
                   @Res() response: Response,
                   @SessionParam('userUuid') userUuid: string,
                   @SessionParam('id') sessionUuid: string,
                   @Param('workspaceUuid') workspaceUuid: string,
                   @Param('connectionUuid') connectionUuid: string,
                   @Param('srcPath') srcPath: string,
                   @Param('dstPath') dstPath: string) {
    logger.info(`[API VmwareFile] -> Upload file -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], srcPath [${srcPath}], dstPath [${dstPath}]`);

    const VmwareFileSystemModule: AnyOpsOSNodeVmwareFileSystemModule = new AnyOpsOSNodeVmwareFileSystemModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const percentageEvent: EventEmitter = await VmwareFileSystemModule.putFile(srcPath, dstPath);

    percentageEvent
      .on('data', (percentage: number) => {
        return response.write(percentage);
      }).on('removeListener', () => {
        return ApiGlobalsModule.validResponse();
      });
  }

  @Patch('/:workspaceUuid/:connectionUuid/:type/:fileName/:srcDatastoreName/:srcDatacenterName')
  async patchFile(@Req() request: Request,
                  @Res() response: Response,
                  @SessionParam('userUuid') userUuid: string,
                  @SessionParam('id') sessionUuid: string,
                  @Param('workspaceUuid') workspaceUuid: string,
                  @Param('connectionUuid') connectionUuid: string,
                  @Param('type') type: 'copy' | 'move' | 'rename' | 'chmod' | 'chown',
                  @Param('srcPath') srcPath: string,
                  @Param('srcDatastoreName') srcDatastoreName: string,
                  @Param('srcDatacenterName') srcDatacenterName: string,
                  @BodyParam('dstPath', { required: false }) dstPath?: string,
                  @BodyParam('dstDatastoreName', { required: false }) dstDatastoreName?: string,
                  @BodyParam('dstDatacenterName', { required: false }) dstDatacenterName?: string,
                  @BodyParam('permissions', { required: false }) permissions?: string) {
    logger.info(`[API VmwareFile] -> Rename/Move/Copy/Chown/Chmod file -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], type [${type}], srcPath [${srcPath}], dstPath [${dstPath}], permissions [${permissions}]`);

    const VmwareFileSystemModule: AnyOpsOSNodeVmwareFileSystemModule = new AnyOpsOSNodeVmwareFileSystemModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    // 'dst' is required by 'copy' | 'move' | 'rename'
    // 'permissions' is required by 'chmod' | 'chown'
    if (typeof dstPath === 'undefined' && typeof permissions === 'undefined') {
      return ApiGlobalsModule.invalidResponse('dst_or_permissions_undefined');
    }

    if (type === 'rename' && dstPath) await VmwareFileSystemModule.patchFile(type, srcPath, srcDatastoreName, srcDatacenterName, dstPath);
    if ((type === 'copy' || type === 'move') && dstPath && dstDatastoreName && dstDatacenterName) await VmwareFileSystemModule.patchFile(type, srcPath, srcDatastoreName, srcDatacenterName, dstPath, dstDatastoreName, dstDatacenterName);

    // TODO
    if ((type === 'chmod' || type === 'chown') && permissions) await VmwareFileSystemModule.patchFilePermissions(type, srcPath, permissions);

    return ApiGlobalsModule.validResponse();
  }

  @Delete('/:workspaceUuid/:connectionUuid/:srcPath/:datastoreName/:datacenterName')
  async deleteFile(@Req() request: Request,
                   @Res() response: Response,
                   @SessionParam('userUuid') userUuid: string,
                   @SessionParam('id') sessionUuid: string,
                   @Param('workspaceUuid') workspaceUuid: string,
                   @Param('connectionUuid') connectionUuid: string,
                   @Param('srcPath') srcPath: string,
                   @Param('datastoreName') datastoreName: string,
                   @Param('datacenterName') datacenterName: string) {
    logger.info(`[API VmwareFile] -> Delete file -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], srcPath [${srcPath}]`);

    const VmwareFileSystemModule: AnyOpsOSNodeVmwareFileSystemModule = new AnyOpsOSNodeVmwareFileSystemModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    await VmwareFileSystemModule.deleteFile(srcPath, datastoreName, datacenterName);

    return ApiGlobalsModule.validResponse();
  }

}
