import {getLogger, Logger} from 'log4js';
import {copy, ensureDir, move, outputFile, pathExistsSync, readdir, remove, stat, Stats} from 'fs-extra';
import {parse} from 'url';
import {join} from 'path';
import {spawn} from 'child-process-promise';

import {AnyOpsOSSysGetPathModule} from '@anyopsos/module-sys-get-path';
import {AnyOpsOSCredentialModule, Credential} from '@anyopsos/module-credential';
import {AnyOpsOSFile} from '@anyopsos/backend-core/app/types/anyopsos-file';


const logger: Logger = getLogger('mainLog');

export class AnyOpsOSFileSystemModule {

  private readonly GetPathModule: AnyOpsOSSysGetPathModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string) {

    this.GetPathModule = new AnyOpsOSSysGetPathModule();
  }

  private octalToRWX(octalNotation: string): string {
    const octalArray: string[] = octalNotation.substr(0, 4).split('').reverse();
    const rwxResult: string[] = [];
    octalArray.forEach((e, t) => {
      switch (t) {
        case 0:
        case 1:
        case 2:
          // tslint:disable:no-bitwise
          rwxResult.push(1 & +e ? 'x' : '-');
          // tslint:disable:no-bitwise
          rwxResult.push(2 & +e ? 'w' : '-');
          // tslint:disable:no-bitwise
          rwxResult.push(4 & +e ? 'r' : '-');
          break;
        case 3:
          // tslint:disable-next-line:no-unused-expression
          4 & +e && (rwxResult[6] = '-' === rwxResult[6] ? 'S' : 's');
          // tslint:disable-next-line:no-unused-expression
          2 & +e && (rwxResult[3] = '-' === rwxResult[3] ? 'S' : 's');
          // tslint:disable-next-line:no-unused-expression
          1 & +e && (rwxResult[0] = '-' === rwxResult[0] ? 'T' : 't');
      }
    });

    return rwxResult.reverse().join('');
  }

  /**
   * Folder API
   *
   * realSrcPath & realDstPath are used for local files since it will be a full path instead of relative
   */
  async getFolder(srcPath: string): Promise<AnyOpsOSFile[]> {
    logger.debug(`[Module FileSystem] -> getFolder -> srcPath [${srcPath}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    const realSrcPath: string = join(this.GetPathModule.filesystem, srcPath);

    if (!pathExistsSync(realSrcPath)) throw new Error('resource_not_found');

    const folderFiles: string[] = await readdir(realSrcPath);
    return Promise.all(
      folderFiles.map(async (directory: string): Promise<AnyOpsOSFile> => {

        const fileStats: Stats = await stat(join(realSrcPath, directory));
        const fileName: string = join(realSrcPath, directory);
        const realFileName: string = fileName.replace(realSrcPath, '');
        const filePermissions: string = this.octalToRWX((fileStats.mode & parseInt('777', 8)).toString(8));
        const fileType: string = fileStats.isDirectory() ? 'd' :
          fileStats.isFile() ? '-' :
            fileStats.isSymbolicLink() ? 'l' :
              fileStats.isSocket() ? 's' :
                fileStats.isFIFO() ? 'l' :
                  fileStats.isBlockDevice() ? 'b' :
                    fileStats.isCharacterDevice() ? 'c' : '-';

        return {
          fileName: realFileName,
          longName: [fileType + filePermissions, fileStats.nlink, fileStats.uid, fileStats.gid, fileStats.size, fileStats.mtime, realFileName].join(' '),
          attrs: fileStats
        } as AnyOpsOSFile;
      })
    );
  }

  async putFolder(dstPath: string): Promise<void> {
    logger.debug(`[Module FileSystem] -> putFolder -> dstPath [${dstPath}]`);

    // Security check
    if (dstPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    const realDstPath: string = join(this.GetPathModule.filesystem, dstPath);

    if (pathExistsSync(realDstPath)) throw new Error('resource_already_exists');

    return ensureDir(realDstPath);
  }

  /**
   * File API
   *
   * realSrcPath & realDstPath are used for local files since it will be a full path instead of relative
   */
  async getFile(srcPath: string): Promise<void> {
    logger.debug(`[Module FileSystem] -> getFile -> srcPath [${srcPath}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    const realSrcPath: string = join(this.GetPathModule.filesystem, srcPath);

    if (!pathExistsSync(realSrcPath)) throw new Error('resource_not_found');

    const fileStats: Stats = await stat(realSrcPath);
    if (fileStats.isDirectory()) throw new Error('resource_invalid');

    // TODO
    const options = {
      root: new AnyOpsOSSysGetPathModule().filesystem,
      dotfiles: 'allow',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };

  }

  async putFile(file: Express.Multer.File, dstPath: string): Promise<void> {
    logger.debug(`[Module FileSystem] -> putFile -> file [${file.originalname}], dstPath [${dstPath}]`);

    // Security check
    if (dstPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    const realDstPath: string = join(this.GetPathModule.filesystem, dstPath);

    if (pathExistsSync(realDstPath)) throw new Error('resource_already_exists');

    return outputFile(realDstPath, file.buffer);
  }

  async downloadFileFromUrl(url: string, dstPath: string, credentialUuid?: string, workspaceUuid?: string): Promise<void> {
    logger.debug(`[Module FileSystem] -> downloadFileFromUrl -> url [${url}], dstPath [${dstPath}], credentialUuid [${credentialUuid}]`);

    // Security check
    if (dstPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    // TODO: check file already exists

    const fileUrl: string = parse(url).href;

    // @ts-ignore TODO
    const fileName: string = parse(fileUrl).pathname.split('/').pop();
    const realDownloadPath: string = join(this.GetPathModule.filesystem, dstPath, fileName);

    let curlData;
    if (credentialUuid && workspaceUuid) {

      const CredentialModule: AnyOpsOSCredentialModule = new AnyOpsOSCredentialModule(this.userUuid, this.sessionUuid, workspaceUuid);

      const credential: Credential = await CredentialModule.getCredential(credentialUuid);

      curlData = await spawn('curl', ['-k', '--user', `${credential.username}:${credential.password}`, fileUrl], { capture: [ 'stdout', 'stderr' ]});
    } else {
      curlData = await spawn('curl', ['-k', fileUrl], { capture: [ 'stdout', 'stderr' ]});
    }

    return outputFile(realDownloadPath, curlData);
  }

  async patchFile(type: 'copy' | 'move' | 'rename', srcPath: string, dstPath: string): Promise<void> {
    logger.debug(`[Module FileSystem] -> patchFile -> type [${type}], srcPath [${srcPath}], dstPath [${dstPath}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');
    if (dstPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    const realSrcPath: string = join(this.GetPathModule.filesystem, srcPath);
    const realDstPath: string = join(this.GetPathModule.filesystem, dstPath);

    if (!pathExistsSync(realSrcPath)) throw new Error('resource_not_found');
    if (pathExistsSync(realDstPath)) throw new Error('resource_already_exists');

    if (type === 'copy') await copy(realSrcPath, realDstPath);
    if (type === 'move') await move(realSrcPath, realDstPath);
    if (type === 'rename') await move(realSrcPath, realDstPath);
  }

  async patchFilePermissions(type: 'chmod' | 'chown', srcPath: string, permissions: string): Promise<void> {
    logger.debug(`[Module FileSystem] -> patchFilePermissions -> type [${type}], srcPath [${srcPath}], permissions [${permissions}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    const realSrcPath: string = join(this.GetPathModule.filesystem, srcPath);

    if (!pathExistsSync(realSrcPath)) throw new Error('resource_not_found');

    // TODO chmod/chown
  }

  async deleteFile(srcPath: string): Promise<void> {
    logger.debug(`[Module FileSystem] -> deleteFile -> srcPath [${srcPath}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    const realSrcPath: string = join(this.GetPathModule.filesystem, srcPath);

    if (!pathExistsSync(realSrcPath)) throw new Error('resource_not_found');

    await remove(realSrcPath);
  }

}
