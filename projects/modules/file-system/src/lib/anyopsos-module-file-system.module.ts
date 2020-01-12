import {copy, ensureDir, move, outputFile, pathExistsSync, readdir, remove, stat, Stats} from 'fs-extra';
import {parse} from 'url';
import {join} from 'path';
import {Stats as SftpStats} from 'ssh2-streams';
import {spawn} from 'child-process-promise';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSGetPathModule} from '@anyopsos/module-get-path';
import {SshSessionsModule, AsyncSFTPWrapper} from '@anyopsos/module-ssh';
import {AnyOpsOSCredentialModule, KdbxCredential} from '@anyopsos/module-credential';
import {AnyOpsOSFile} from '@anyopsos/backend/app/types/anyopsos-file';


const logger: Logger = getLogger('mainlog');

export class AnyOpsOSFileSystemModule {

  constructor(private readonly userUuid?: string,
              private readonly sessionUuid?: string) {
  }

  octalToRWX(octalNotation: string) {
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
   * Some APIS are local & remote (if connectionUuid is provided)
   */
  async getFolder(folderPath: string, connectionUuid?: string): Promise<AnyOpsOSFile[]> {
    logger.debug(`[Module FileSystem] -> getFolder -> folderPath [${folderPath}], connectionUuid [${connectionUuid}]`);

    if (connectionUuid) {
      if (!this.userUuid || !this.sessionUuid) throw new Error('invalid_params');
      // TODO check if exists

      const Sftp: AsyncSFTPWrapper = new SshSessionsModule().getSFTPWrapper(this.userUuid, this.sessionUuid, connectionUuid);
      return Sftp.readdirAsync(folderPath);
    } else {
      if (!pathExistsSync(folderPath)) throw new Error('resource_not_found');

      const folderFiles: string[] = await readdir(folderPath);
      return Promise.all(
        folderFiles.map(async (directory: string): Promise<AnyOpsOSFile> => {

          const fileStats: Stats = await stat(join(folderPath, directory));
          const fileName: string = join(folderPath, directory);
          const realFileName: string = fileName.replace(folderPath, '');
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
  }

  async putFolder(folderPath: string, connectionUuid?: string): Promise<void> {
    logger.debug(`[Module FileSystem] -> putFolder -> folderPath [${folderPath}], connectionUuid [${connectionUuid}]`);

    if (connectionUuid) {
      if (!this.userUuid || !this.sessionUuid) throw new Error('invalid_params');

      const Sftp: AsyncSFTPWrapper = new SshSessionsModule().getSFTPWrapper(this.userUuid, this.sessionUuid, connectionUuid);

      // TODO check if already exists.
      // TODO create parents?
      return  Sftp.mkdirAsync(folderPath);
    } else {
      if (pathExistsSync(folderPath)) throw new Error('resource_already_exists');

      return ensureDir(folderPath);
    }

  }

  /**
   * File API
   *
   * Some APIS are local & remote (if connectionUuid is provided)
   */
  // TODO
  getFile(filePath: string) {
    logger.debug(`[Module FileSystem] -> getFile -> filePath [${filePath}]`);

    // Security check
    if (filePath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    if (!pathExistsSync(filePath)) throw new Error('resource_not_found');

    const options = {
      root: new AnyOpsOSGetPathModule().filesystem,
      dotfiles: 'allow',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };
  }

  async downloadFileFromUrl(url: string, path: string, connectionUuid?: string, credentialUuid?: string): Promise<void> {
    logger.debug(`[Module FileSystem] -> downloadFileFromUrl -> url [${url}], path [${path}], connectionUuid [${connectionUuid}], credentialUuid [${credentialUuid}]`);

    // Security check
    if (path.indexOf('\0') !== -1) throw new Error('param_security_stop');

    // TODO: check file already exists

    const fileUrl: string = parse(url).href;
    const fileName: string = parse(fileUrl).pathname.split('/').pop();
    const downloadPath: string = join(new AnyOpsOSGetPathModule().filesystem, path, fileName);

    // Remote
    if (connectionUuid) {
      if (!this.userUuid || !this.sessionUuid) throw new Error('invalid_params');

      if (credentialUuid) {
        const credential: KdbxCredential = await new AnyOpsOSCredentialModule().getCredential(this.userUuid, this.sessionUuid, credentialUuid);
        await new SshSessionsModule().execAsync(
          this.userUuid,
          this.sessionUuid,
          connectionUuid,
          'curl', ['-k', '--user', `${credential.fields.UserName}:${credential.fields.Password.getText()}`, '-o', downloadPath, fileUrl]
        );
      } else {
        await new SshSessionsModule().execAsync(this.userUuid, this.sessionUuid, connectionUuid, 'curl', ['-k', '-o', downloadPath, fileUrl]);
      }

    // Local
    } else {
      let curlData;
      if (credentialUuid) {
        if (!this.userUuid || !this.sessionUuid) throw new Error('invalid_params');

        const credential: KdbxCredential = await new AnyOpsOSCredentialModule().getCredential(this.userUuid, this.sessionUuid, credentialUuid);
        curlData = await spawn('curl', ['-k', '--user', `${credential.fields.UserName}:${credential.fields.Password.getText()}`, fileUrl], { capture: [ 'stdout', 'stderr' ]});
      } else {
        curlData = await spawn('curl', ['-k', fileUrl], { capture: [ 'stdout', 'stderr' ]});
      }

      return outputFile(downloadPath, curlData);
    }
  }

  async patchFile(type: 'copy' | 'move' | 'rename', srcPath: string, dstPath: string, connectionUuid?: string): Promise<void> {
    logger.debug(`[Module FileSystem] -> patchFile -> type [${type}], srcPath [${srcPath}], dstPath [${dstPath}], connectionUuid [${connectionUuid}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');
    if (dstPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    // Remote
    if (connectionUuid) {
      if (!this.userUuid || !this.sessionUuid) throw new Error('invalid_params');

      const Sftp: AsyncSFTPWrapper = new SshSessionsModule().getSFTPWrapper(this.userUuid, this.sessionUuid, connectionUuid);

      // TODO check if file/path exists
      // TODO try not tu use internal commands like 'cp'
      if (type === 'copy') await new SshSessionsModule().execAsync(this.userUuid, this.sessionUuid, connectionUuid, 'cp', ['-r', srcPath, dstPath]);
      if (type === 'move') await Sftp.renameAsync(srcPath, dstPath);
      if (type === 'rename') await Sftp.renameAsync(srcPath, dstPath);

    // Local
    } else {
      if (!pathExistsSync(srcPath)) throw new Error('resource_not_found');

      if (type === 'copy') await copy(srcPath, dstPath);
      if (type === 'move') await move(srcPath, dstPath);
      if (type === 'rename') await move(srcPath, dstPath);
    }
  }

  async patchFilePermissions(type: 'chmod' | 'chown', srcPath: string, permissions: string, connectionUuid?: string): Promise<void> {
    logger.debug(`[Module FileSystem] -> patchFile -> type [${type}], srcPath [${srcPath}], permissions [${permissions}], connectionUuid [${connectionUuid}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    // Remote
    if (connectionUuid) {
      if (!this.userUuid || !this.sessionUuid) throw new Error('invalid_params');

      const Sftp: AsyncSFTPWrapper = new SshSessionsModule().getSFTPWrapper(this.userUuid, this.sessionUuid, connectionUuid);

      // TODO check if file/path exists
      if (type === 'chmod') await Sftp.chmodAsync(srcPath, permissions);
      if (type === 'chown') {
        const uid: number = parseInt(permissions.split(':')[0], 10);
        const gid: number = parseInt(permissions.split(':')[1], 10);
        await Sftp.chownAsync(srcPath, uid, gid);
      }

    // Local
    } else {
      if (!pathExistsSync(srcPath)) throw new Error('resource_not_found');

      // TODO chmod/chown
    }
  }

  async deleteFile(filePath: string, connectionUuid?: string): Promise<void> {
    logger.debug(`[Module FileSystem] -> patchFile -> filePath [${filePath}], connectionUuid [${connectionUuid}]`);

    // Security check
    if (filePath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    if (connectionUuid) {
      if (!this.userUuid || !this.sessionUuid) throw new Error('invalid_params');

      // TODO check if file/path exists
      const Sftp: AsyncSFTPWrapper = new SshSessionsModule().getSFTPWrapper(this.userUuid, this.sessionUuid, connectionUuid);

      const pathStat: SftpStats = await Sftp.statAsync(filePath);
      if (pathStat.isDirectory()) {
        await Sftp.rmdirAsync(filePath);
      } else {
        await Sftp.unlinkAsync(filePath);
      }
    } else {
      if (!pathExistsSync(filePath)) throw new Error('resource_not_found');

      await remove(filePath);
    }
  }

}
