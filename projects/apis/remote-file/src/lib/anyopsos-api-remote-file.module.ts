import {Controller, Authorized, Req, Res, Post, Param, BodyParam, Patch, Delete} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSFileSystemModule} from '@anyopsos/module-file-system';

const logger: Logger = getLogger('mainlog');

@Authorized()
@Controller('/api/remote-file')
export class AnyOpsOSRemoteFileApiController {

  // TODO download_to_anyopsos
  // TODO upload_from_anyopsos
  // TODO promisify sftp functions

  @Post('/:connectionUuid/download_from_url')
  async getRemoteFile(@Req() request: Request,
                      @Res() response: Response,
                      @SessionParam('userUuid') userUuid: string,
                      @SessionParam('id') sessionUuid: string,
                      @Param('connectionUuid') connectionUuid: string,
                      @BodyParam('path') path: string,
                      @BodyParam('url') url: string,
                      @BodyParam('credentialUuid') credentialUuid?: string) {
    logger.info(`[API Remote File] -> Creating file -> Downloading file from internet -> connectionUuid [${connectionUuid}], path [${path}], url [${url}]`);

    await new AnyOpsOSFileSystemModule(userUuid, sessionUuid).downloadFileFromUrl(url, path, connectionUuid, credentialUuid);
    return new AnyOpsOSApiGlobalsModule(request, response).validResponse();
  }

  @Patch('/:connectionUuid/:type/:fileName')
  async patchFile(@Req() request: Request,
                  @Res() response: Response,
                  @SessionParam('userUuid') userUuid: string,
                  @SessionParam('id') sessionUuid: string,
                  @Param('connectionUuid') connectionUuid: string,
                  @Param('type') type: 'copy' | 'move' | 'rename' | 'chmod' | 'chown',
                  @Param('fileName') fileName: string,
                  @BodyParam('dstPath') dstPath?: string,
                  @BodyParam('permissions') permissions?: string) {
    logger.info(`[API RemoteFile] -> Rename/Move/Copy/Chown/Chmod file -> connectionUuid [${connectionUuid}], type [${type}], file [${fileName}], dstPath [${dstPath}]`);

    // 'dst' is required by 'copy' | 'move' | 'rename'
    // 'permissions' is required by 'chmod' | 'chown'
    if (typeof dstPath === 'undefined' && typeof permissions === 'undefined') {
      return new AnyOpsOSApiGlobalsModule(request, response).invalidResponse('dst_or_permissions_undefined');
    }

    if (type === 'copy' || type === 'move' || type === 'rename') await new AnyOpsOSFileSystemModule(userUuid, sessionUuid).patchFile(type, fileName, dstPath, connectionUuid);
    if (type === 'chmod' || type === 'chown') await new AnyOpsOSFileSystemModule(userUuid, sessionUuid).patchFilePermissions(type, fileName, permissions, connectionUuid);
    return new AnyOpsOSApiGlobalsModule(request, response).validResponse();
  }

  @Delete('/:connectionUuid/:fileName')
  async deleteFile(@Req() request: Request,
                   @Res() response: Response,
                   @SessionParam('userUuid') userUuid: string,
                   @SessionParam('id') sessionUuid: string,
                   @Param('connectionUuid') connectionUuid: string,
                   @Param('fileName') fileName: string) {
    logger.info(`[API RemoteFile] -> Delete file -> connectionUuid [${connectionUuid}], file [${fileName}]`);

    await new AnyOpsOSFileSystemModule(userUuid, sessionUuid).deleteFile(fileName, connectionUuid);
    return new AnyOpsOSApiGlobalsModule(request, response).validResponse();
  }

}
