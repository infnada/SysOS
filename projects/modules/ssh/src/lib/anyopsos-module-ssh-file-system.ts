import {pathExistsSync} from 'fs-extra';
import {parse} from 'url';
import {join} from 'path';
import {FileEntry, Stats as SftpStats} from 'ssh2-streams';
import {getLogger, Logger} from 'log4js';
import {EventEmitter} from 'events';

import {AnyOpsOSGetPathModule} from '@anyopsos/module-get-path';
import {AnyOpsOSCredentialModule, KdbxCredential} from '@anyopsos/module-credential';
import {AnyOpsOSFile} from '@anyopsos/backend/app/types/anyopsos-file';

import {AnyOpsOSSshSessionStateModule} from './anyopsos-module-ssh-session-state';
import {AsyncSFTPWrapper} from './types/async-sftp-wrapper';


const logger: Logger = getLogger('mainLog');

export class AnyOpsOSSshFileSystemModule {

  private readonly GetPathModule: AnyOpsOSGetPathModule;
  private readonly CredentialModule: AnyOpsOSCredentialModule;
  private readonly SshSessionStateModule: AnyOpsOSSshSessionStateModule;
  private readonly SftpWrapper: AsyncSFTPWrapper;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string,
              private readonly connectionUuid: string) {

    if (!this.userUuid || !this.sessionUuid || !this.workspaceUuid || !this.connectionUuid) throw new Error('invalid_constructor_params');

    this.GetPathModule = new AnyOpsOSGetPathModule();
    this.CredentialModule = new AnyOpsOSCredentialModule(this.userUuid, this.sessionUuid, this.workspaceUuid);
    this.SshSessionStateModule = new AnyOpsOSSshSessionStateModule(this.userUuid, this.sessionUuid, this.workspaceUuid, this.connectionUuid);
    this.SftpWrapper = this.SshSessionStateModule.getSFTPWrapper();
  }

  /**
   * Folder API
   *
   * realSrcPath & realDstPath are used for local files since it will be a full path instead of relative
   * srcPath & dstPath are used for remote connections and we keep it "as is"
   */
  async getFolder(srcPath: string): Promise<AnyOpsOSFile[]> {
    logger.debug(`[Module SshFileSystem] -> getFolder -> srcPath [${srcPath}], connectionUuid [${this.connectionUuid}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    // TODO check if exists
    const pathFiles: FileEntry[] = this.SftpWrapper.readdirAsync(srcPath);

    return pathFiles.map((file: FileEntry) => {
      return {
        fileName: file.filename,
        longName: file.longname,
        attrs: file.attrs as any
      };
    }) as AnyOpsOSFile[];
  }

  async putFolder(dstPath: string): Promise<void> {
    logger.debug(`[Module SshFileSystem] -> putFolder -> dstPath [${dstPath}], connectionUuid [${this.connectionUuid}]`);

    // Security check
    if (dstPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    // TODO check if already exists.
    // TODO create parents?
    return this.SftpWrapper.mkdirAsync(dstPath);
  }

  /**
   * File API
   *
   * realSrcPath & realDstPath are used for local files since it will be a full path instead of relative
   * srcPath & dstPath are used for remote connections and we keep it "as is"
   */
  async getFile(srcPath: string, dstPath: string): Promise<EventEmitter> {
    logger.debug(`[Module SshFileSystem] -> getFile -> srcPath [${srcPath}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');
    if (dstPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    const realDstPath: string = join(this.GetPathModule.filesystem, dstPath);

    const eventEmitter = new EventEmitter();
    const sendPercentage = (percentage: number): number => {
      return percentage;
    };

    // TODO: check file already exists on remote
    // TODO check if src is a folder
    if (!pathExistsSync(realDstPath)) throw new Error('resource_not_found');

    await this.SftpWrapper.fastGetAsync(srcPath, realDstPath, {
      step: (totalTransferred: number, chunk: number, total: number) => {

        const percentage: number = parseInt(((totalTransferred * 100) / total).toFixed(), 10);
        eventEmitter.emit('data', sendPercentage(percentage));

        if (percentage === 100) eventEmitter.removeListener('data', sendPercentage);
      }
    });

    return eventEmitter;
  }

  async putFile(srcPath: string, dstPath: string): Promise<EventEmitter> {
    logger.debug(`[Module SshFileSystem] -> putFile -> srcPath [${srcPath}], dstPath [${dstPath}], connectionUuid [${this.connectionUuid}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');
    if (dstPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    const realSrcPath: string = join(new AnyOpsOSGetPathModule().filesystem, srcPath);

    const eventEmitter = new EventEmitter();
    const sendPercentage = (percentage: number): number => {
      return percentage;
    };

    // TODO: check file already exists on remote
    // TODO: check if src is a folder
    if (!pathExistsSync(realSrcPath)) throw new Error('resource_invalid');

    await this.SftpWrapper.fastPutAsync(realSrcPath, dstPath, {
      step: (totalTransferred: number, chunk: number, total: number) => {

        const percentage: number = parseInt(((totalTransferred * 100) / total).toFixed(), 10);
        eventEmitter.emit('data', sendPercentage(percentage));

        if (percentage === 100) eventEmitter.removeListener('data', sendPercentage);
      }
    });

    return eventEmitter;
  }

  async downloadFileFromUrl(url: string, dstPath: string, credentialUuid?: string): Promise<void> {
    logger.debug(`[Module SshFileSystem] -> downloadFileFromUrl -> url [${url}], dstPath [${dstPath}], connectionUuid [${this.connectionUuid}], credentialUuid [${credentialUuid}]`);

    // Security check
    if (dstPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    // TODO: check file already exists

    const fileUrl: string = parse(url).href;

    // @ts-ignore TODO
    const fileName: string = parse(fileUrl).pathname.split('/').pop();
    const downloadPath: string = join(dstPath, fileName);

    if (credentialUuid) {
      const credential: KdbxCredential = await this.CredentialModule.getCredential(credentialUuid);
      await this.SshSessionStateModule.execAsync(
        'curl', ['-k', '--user', `${credential.fields.UserName}:${credential.fields.Password.getText()}`, '-o', downloadPath, fileUrl]
      );
    } else {
      await this.SshSessionStateModule.execAsync('curl', ['-k', '-o', downloadPath, fileUrl]);
    }
  }

  async patchFile(type: 'copy' | 'move' | 'rename', srcPath: string, dstPath: string): Promise<void> {
    logger.debug(`[Module SshFileSystem] -> patchFile -> type [${type}], srcPath [${srcPath}], dstPath [${dstPath}], connectionUuid [${this.connectionUuid}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');
    if (dstPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    // TODO check if file/path exists
    // TODO try not tu use internal commands like 'cp'
    if (type === 'copy') await this.SshSessionStateModule.execAsync('cp', ['-r', srcPath, dstPath]);
    if (type === 'move') await this.SftpWrapper.renameAsync(srcPath, dstPath);
    if (type === 'rename') await this.SftpWrapper.renameAsync(srcPath, dstPath);
  }

  async patchFilePermissions(type: 'chmod' | 'chown', srcPath: string, permissions: string): Promise<void> {
    logger.debug(`[Module SshFileSystem] -> patchFilePermissions -> type [${type}], srcPath [${srcPath}], permissions [${permissions}], connectionUuid [${this.connectionUuid}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    // TODO check if file/path exists
    if (type === 'chmod') await this.SftpWrapper.chmodAsync(srcPath, permissions);
    if (type === 'chown') {
      const uid: number = parseInt(permissions.split(':')[0], 10);
      const gid: number = parseInt(permissions.split(':')[1], 10);
      await this.SftpWrapper.chownAsync(srcPath, uid, gid);
    }
  }

  async deleteFile(srcPath: string): Promise<void> {
    logger.debug(`[Module SshFileSystem] -> deleteFile -> srcPath [${srcPath}], connectionUuid [${this.connectionUuid}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    // TODO check if file/path exists

    const pathStat: SftpStats = await this.SftpWrapper.statAsync(srcPath);
    if (pathStat.isDirectory()) {
      await this.SftpWrapper.rmdirAsync(srcPath);
    } else {
      await this.SftpWrapper.unlinkAsync(srcPath);
    }
  }
}
