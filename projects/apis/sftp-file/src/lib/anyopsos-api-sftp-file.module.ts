import {Controller, Authorized, Req, Res, Post, Param, BodyParam, Patch, Delete, Put, Get} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';
import {EventEmitter} from 'events';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSSshFileSystemModule} from '@anyopsos/module-ssh';


const logger: Logger = getLogger('mainLog');

@Authorized()
@Controller('/api/sftp-file')
export class AnyOpsOSRemoteFileApiController {

  @Get('/:workspaceUuid/:connectionUuid/:srcPath/:dstPath')
  async downloadFile(@Req() request: Request,
                     @Res() response: Response,
                     @SessionParam('userUuid') userUuid: string,
                     @SessionParam('id') sessionUuid: string,
                     @Param('workspaceUuid') workspaceUuid: string,
                     @Param('connectionUuid') connectionUuid: string,
                     @Param('srcPath') srcPath: string,
                     @Param('dstPath') dstPath: string) {
    logger.info(`[API RemoteFile] -> Download file -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], srcPath [${srcPath}], dstPath [${dstPath}]`);

    const SshFileSystemModule: AnyOpsOSSshFileSystemModule = new AnyOpsOSSshFileSystemModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const percentageEvent: EventEmitter = await SshFileSystemModule.getFile(srcPath, dstPath);

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
    logger.info(`[API RemoteFile] -> Upload file -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], srcPath [${srcPath}], dstPath [${dstPath}]`);

    const SshFileSystemModule: AnyOpsOSSshFileSystemModule = new AnyOpsOSSshFileSystemModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const percentageEvent: EventEmitter = await SshFileSystemModule.putFile(srcPath, dstPath);

    percentageEvent
      .on('data', (percentage: number) => {
        return response.write(percentage);
      }).on('removeListener', () => {
        return ApiGlobalsModule.validResponse();
      });
  }

  @Post('/:workspaceUuid/:connectionUuid/download_from_url')
  async getRemoteFile(@Req() request: Request,
                      @Res() response: Response,
                      @SessionParam('userUuid') userUuid: string,
                      @SessionParam('id') sessionUuid: string,
                      @Param('workspaceUuid') workspaceUuid: string,
                      @Param('connectionUuid') connectionUuid: string,
                      @BodyParam('dstPath') dstPath: string,
                      @BodyParam('url') url: string,
                      @BodyParam('credentialUuid') credentialUuid?: string) {
    logger.info(`[API RemoteFile] -> Creating file -> Downloading file from internet -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], dstPath [${dstPath}], url [${url}]`);

    const SshFileSystemModule: AnyOpsOSSshFileSystemModule = new AnyOpsOSSshFileSystemModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    await SshFileSystemModule.downloadFileFromUrl(url, dstPath, credentialUuid);

    return ApiGlobalsModule.validResponse();
  }

  @Patch('/:workspaceUuid/:connectionUuid/:type/:fileName')
  async patchFile(@Req() request: Request,
                  @Res() response: Response,
                  @SessionParam('userUuid') userUuid: string,
                  @SessionParam('id') sessionUuid: string,
                  @Param('workspaceUuid') workspaceUuid: string,
                  @Param('connectionUuid') connectionUuid: string,
                  @Param('type') type: 'copy' | 'move' | 'rename' | 'chmod' | 'chown',
                  @Param('srcPath') srcPath: string,
                  @BodyParam('dstPath', { required: false }) dstPath?: string,
                  @BodyParam('permissions', { required: false }) permissions?: string) {
    logger.info(`[API RemoteFile] -> Rename/Move/Copy/Chown/Chmod file -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], type [${type}], srcPath [${srcPath}], dstPath [${dstPath}], permissions [${permissions}]`);

    const SshFileSystemModule: AnyOpsOSSshFileSystemModule = new AnyOpsOSSshFileSystemModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    // 'dst' is required by 'copy' | 'move' | 'rename'
    // 'permissions' is required by 'chmod' | 'chown'
    if (typeof dstPath === 'undefined' && typeof permissions === 'undefined') {
      return ApiGlobalsModule.invalidResponse('dst_or_permissions_undefined');
    }

    if ((type === 'copy' || type === 'move' || type === 'rename') && dstPath) await SshFileSystemModule.patchFile(type, srcPath, dstPath);
    if ((type === 'chmod' || type === 'chown') && permissions) await SshFileSystemModule.patchFilePermissions(type, srcPath, permissions);

    return ApiGlobalsModule.validResponse();
  }

  @Delete('/:workspaceUuid/:connectionUuid/:srcPath')
  async deleteFile(@Req() request: Request,
                   @Res() response: Response,
                   @SessionParam('userUuid') userUuid: string,
                   @SessionParam('id') sessionUuid: string,
                   @Param('workspaceUuid') workspaceUuid: string,
                   @Param('connectionUuid') connectionUuid: string,
                   @Param('srcPath') srcPath: string) {
    logger.info(`[API RemoteFile] -> Delete file -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], srcPath [${srcPath}]`);

    const SshFileSystemModule: AnyOpsOSSshFileSystemModule = new AnyOpsOSSshFileSystemModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    await SshFileSystemModule.deleteFile(srcPath);

    return ApiGlobalsModule.validResponse();
  }

}
