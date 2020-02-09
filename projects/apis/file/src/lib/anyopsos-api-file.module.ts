import {Controller, Get, Authorized, Req, Res, Param, Post, BodyParam, Patch, Delete, Put, UploadedFile} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';
import {pathExistsSync, stat, Stats} from 'fs-extra';
import {join} from 'path';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSGetPathModule} from '@anyopsos/module-get-path';
import {AnyOpsOSFileSystemModule} from '@anyopsos/module-file-system';


const logger: Logger = getLogger('mainLog');

@Authorized()
@Controller('/api/file')
export class AnyOpsOSFileApiController {

  // TODO not using file-system module
  @Get('/:srcPath')
  async getFile(@Req() request: Request,
                @Res() response: Response,
                @SessionParam('userUuid') userUuid: string,
                @SessionParam('id') sessionUuid: string,
                @Param('srcPath') srcPath: string) {
    logger.info(`[API File] -> Get file -> srcPath [${srcPath}]`);

    const GetPathModule: AnyOpsOSGetPathModule = new AnyOpsOSGetPathModule();

    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    const realSrcPath: string = join(GetPathModule.filesystem, srcPath);
    if (!pathExistsSync(realSrcPath)) throw new Error('resource_not_found');

    const fileStats: Stats = await stat(realSrcPath);
    if (fileStats.isDirectory()) throw new Error('resource_invalid');

    const options = {
      root: GetPathModule.filesystem,
      dotfiles: 'allow',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };

    try {
      await new Promise((resolve, reject) => {

        response.sendFile(srcPath, options, (e: Error) => {
          if (e) reject(e);
          resolve();
        });

      });
    } catch (e) {
      throw new Error(e);
    }

    return;
  }

  @Put('/:dstPath')
  async newFile(@Req() request: Request,
                @Res() response: Response,
                @SessionParam('userUuid') userUuid: string,
                @SessionParam('id') sessionUuid: string,
                @Param('dstPath') dstPath: string,
                @UploadedFile('file') file: Express.Multer.File) {
    logger.info(`[API File] -> Creating file -> dstPath [${dstPath}], file [${file.originalname}]`);

    const FileSystemModule: AnyOpsOSFileSystemModule = new AnyOpsOSFileSystemModule(userUuid, sessionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const realDstPath: string = join(dstPath, file.originalname);

    await FileSystemModule.putFile(file, realDstPath);

    return ApiGlobalsModule.validResponse();
  }

  @Post('/download_from_url')
  async newFileFromUrl(@Req() request: Request,
                       @Res() response: Response,
                       @SessionParam('userUuid') userUuid: string,
                       @SessionParam('id') sessionUuid: string,
                       @BodyParam('dstPath') dstPath: string,
                       @BodyParam('url') url: string,
                       @BodyParam('credentialUuid') credentialUuid?: string) {
    logger.info(`[API File] -> Creating file -> Downloading file from internet -> dstPath [${dstPath}], url [${url}]`);

    const FileSystemModule: AnyOpsOSFileSystemModule = new AnyOpsOSFileSystemModule(userUuid, sessionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    await FileSystemModule.downloadFileFromUrl(url, dstPath, credentialUuid);

    return ApiGlobalsModule.validResponse();
  }

  @Patch('/:type/:srcPath')
  async patchFile(@Req() request: Request,
                  @Res() response: Response,
                  @SessionParam('userUuid') userUuid: string,
                  @SessionParam('id') sessionUuid: string,
                  @Param('type') type: 'copy' | 'move' | 'rename' | 'chmod' | 'chown',
                  @Param('srcPath') srcPath: string,
                  @BodyParam('dstPath', { required: false }) dstPath?: string,
                  @BodyParam('permissions', { required: false }) permissions?: string) {
    logger.info(`[API File] -> Rename/Move/Copy/Chown/Chmod file -> type [${type}], srcPath [${srcPath}], dstPath [${dstPath}]`);

    const FileSystemModule: AnyOpsOSFileSystemModule = new AnyOpsOSFileSystemModule(userUuid, sessionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    // 'dst' is required by 'copy' | 'move' | 'rename'
    // 'permissions' is required by 'chmod' | 'chown'
    if (typeof dstPath === 'undefined' && typeof permissions === 'undefined') {
      return ApiGlobalsModule.invalidResponse('dst_or_permissions_undefined');
    }

    if ((type === 'copy' || type === 'move' || type === 'rename') && dstPath) await FileSystemModule.patchFile(type, srcPath, dstPath);
    if ((type === 'chmod' || type === 'chown') && permissions) await FileSystemModule.patchFilePermissions(type, srcPath, permissions);

    return ApiGlobalsModule.validResponse();
  }

  @Delete('/:srcPath')
  async deleteFile(@Req() request: Request,
                   @Res() response: Response,
                   @SessionParam('userUuid') userUuid: string,
                   @SessionParam('id') sessionUuid: string,
                   @Param('srcPath') srcPath: string) {
    logger.info(`[API File] -> Delete file -> srcPath [${srcPath}]`);

    const FileSystemModule: AnyOpsOSFileSystemModule = new AnyOpsOSFileSystemModule(userUuid, sessionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    await FileSystemModule.deleteFile(srcPath);

    return ApiGlobalsModule.validResponse();
  }

}
