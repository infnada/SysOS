import {
  Controller,
  Get,
  Authorized,
  Req,
  Res,
  Param,
  Post,
  UploadedFiles,
  BodyParam,
  Patch,
  Delete,
  Put
} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';
import {diskStorage, Options} from 'multer';
import {pathExistsSync} from 'fs-extra';
import {join} from 'path';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSGetPathModule} from '@anyopsos/module-get-path';
import {AnyOpsOSFileSystemModule} from '@anyopsos/module-file-system';


const logger: Logger = getLogger('mainlog');
const getMulterOptions = (path: string): Options => {
  return {
    storage: diskStorage({
      destination: (req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void): void => {
        callback(null, join(new AnyOpsOSGetPathModule().filesystem, path));
      },
      filename: (req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void): void => {
        callback(null, file.fieldname);
      }
    }),
    limits: {
      fieldNameSize: 255
    }
  };
};

@Authorized()
@Controller('/api/file')
export class AnyOpsOSFileApiController {

  // TODO not using file-system module
  @Get('/:fileName')
  async getFile(@Req() request: Request,
                @Res() response: Response,
                @Param('fileName') fileName: string) {
    logger.info(`[API File] -> Get file -> file [${fileName}]`);

    const filePath: string = join(new AnyOpsOSGetPathModule().filesystem, fileName);

    if (!pathExistsSync(filePath)) throw new Error('resource_not_found');

    const options = {
      root: new AnyOpsOSGetPathModule().filesystem,
      dotfiles: 'allow',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };

    try {
      await new Promise((resolve, reject) => {

        response.sendFile(fileName, options, (e: Error) => {
          if (e) reject(e);
          resolve();
        });

      });
    } catch (e) {
      throw new Error(e);
    }

    return;
  }

  // TODO not using file-system module
  @Put('/')
  newFile(@Req() request: Request,
          @Res() response: Response,
          @BodyParam('path') path: string,
          @UploadedFiles('files', {
            required: true,
            // TODO extract path from BodyParam
            options: getMulterOptions('/')
          }) files: Express.Multer.File[]) {
    logger.info(`[API File] -> Creating file`);

    // TODO: check file already exists

    return new AnyOpsOSApiGlobalsModule(request, response).validResponse();
  }

  @Post('/download_from_url')
  async newFileFromUrl(@Req() request: Request,
                       @Res() response: Response,
                       @SessionParam('userUuid') userUuid: string,
                       @SessionParam('id') sessionUuid: string,
                       @BodyParam('path') path: string,
                       @BodyParam('url') url: string,
                       @BodyParam('credentialUuid') credentialUuid?: string) {
    logger.info(`[API File] -> Creating file -> Downloading file from internet -> path [${path}], url [${url}]`);

    await new AnyOpsOSFileSystemModule(userUuid, sessionUuid).downloadFileFromUrl(url, path, null, credentialUuid);
    return new AnyOpsOSApiGlobalsModule(request, response).validResponse();
  }

  @Patch('/:type/:fileName')
  async patchFile(@Req() request: Request,
                  @Res() response: Response,
                  @Param('type') type: 'copy' | 'move' | 'rename' | 'chmod' | 'chown',
                  @Param('fileName') fileName: string,
                  @BodyParam('dstPath') dstPath?: string,
                  @BodyParam('permissions') permissions?: string) {
    logger.info(`[API File] -> Rename/Move/Copy/Chown/Chmod file -> type [${type}], file [${fileName}], dstPath [${dstPath}]`);

    const srcPath: string = join(new AnyOpsOSGetPathModule().filesystem, fileName);
    const realDstPath: string = join(new AnyOpsOSGetPathModule().filesystem, dstPath);

    if (type === 'copy' || type === 'move' || type === 'rename') await new AnyOpsOSFileSystemModule().patchFile(type, srcPath, realDstPath);
    if (type === 'chmod' || type === 'chown') await new AnyOpsOSFileSystemModule().patchFilePermissions(type, srcPath, permissions);

    return new AnyOpsOSApiGlobalsModule(request, response).validResponse();
  }

  @Delete('/:fileName')
  async deleteFile(@Req() request: Request,
                   @Res() response: Response,
                   @Param('fileName') fileName: string) {
    logger.info(`[API File] -> Delete file -> file [${fileName}]`);

    const filePath: string = join(new AnyOpsOSGetPathModule().filesystem, fileName);

    await new AnyOpsOSFileSystemModule().deleteFile(filePath);
    return new AnyOpsOSApiGlobalsModule(request, response).validResponse();
  }

}
