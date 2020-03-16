import {getLogger, Logger} from 'log4js';
import {pathExistsSync, readFile} from 'fs-extra';
import {join} from 'path';
import {EventEmitter} from 'events';

import {AnyOpsOSSysGetPathModule} from '@anyopsos/module-sys-get-path';
import {AnyOpsOSFile} from '@anyopsos/backend-core/app/types/anyopsos-file';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';

import {AnyOpsOSNodeNetappModule} from './anyopsos-module-node-netapp.module';
import {AnyOpsOSNodeNetappSessionStateModule} from './anyopsos-module-node-netapp-session-state';


const logger: Logger = getLogger('mainLog');

export class AnyOpsOSNodeNetappFileSystemModule {

  private readonly GetPathModule: AnyOpsOSSysGetPathModule;
  private readonly NetappModule: AnyOpsOSNodeNetappModule;
  private readonly NetappSessionStateModule: AnyOpsOSNodeNetappSessionStateModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string,
              private readonly connectionUuid: string) {

    this.GetPathModule = new AnyOpsOSSysGetPathModule();
    this.NetappModule  = new AnyOpsOSNodeNetappModule(this.userUuid, this.sessionUuid, this.workspaceUuid, this.connectionUuid);
    this.NetappSessionStateModule = new AnyOpsOSNodeNetappSessionStateModule(this.userUuid, this.sessionUuid, this.workspaceUuid, this.connectionUuid);
  }

  /**
   * Folder API
   *
   * realSrcPath & realDstPath are used for local files since it will be a full path instead of relative
   * srcPath & dstPath are used for remote connections and we keep it "as is"
   */
  async getFolder(vfiler: string, srcPath: string): Promise<AnyOpsOSFile[]> {
    logger.debug(`[Module NetappFileSystem] -> getFolder -> srcPath [${srcPath}], connectionUuid [${this.connectionUuid}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    // TODO check if exists
    // <path>/vol/${volume}/.snapshot/${snapshot}${path}</path>
    const pathFiles: BackendResponse & { data: any[]; } = await this.NetappModule.callSoapApi('file-list-directory-iter', {
      path: srcPath
    }, vfiler);

    return pathFiles.data.map((file: any) => {
      if (file.name === '.' || file.name === '..') return;

      return {
        fileName: file.name,
        longName: (file['file-type'] === 'directory' ? 'd---------' : '----------') + ` ${file.name}`,
        attrs: null
      };
    }) as AnyOpsOSFile[];
  }

  async putFolder(vfiler: string, dstPath: string): Promise<void> {
    logger.debug(`[Module NetappFileSystem] -> putFolder -> dstPath [${dstPath}], connectionUuid [${this.connectionUuid}]`);

    // Security check
    if (dstPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    // TODO check if already exists.
    // TODO create parents?
    // <path>/vol/${volume}/${path}</path>
    await this.NetappModule.callSoapApi('file-create-directory', {
      path: dstPath
    }, vfiler);
  }

  /**
   * File API
   *
   * realSrcPath & realDstPath are used for local files since it will be a full path instead of relative
   * srcPath & dstPath are used for remote connections and we keep it "as is"
   */
  async getFile(vfiler: string, srcPath: string, dstPath: string): Promise<EventEmitter> {
    logger.debug(`[Module NetappFileSystem] -> getFile -> srcPath [${srcPath}]`);

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
    // TODO: emit percentage
    if (!pathExistsSync(realDstPath)) throw new Error('resource_not_found');

    // <path>/vol/${volume}/${path}</path>
    const file: unknown = await this.NetappModule.callSoapApi('file-read-file', {
      path: srcPath
    }, vfiler);

    console.log(file);

    return eventEmitter;
  }

  async putFile(vfiler: string, srcPath: string, dstPath: string): Promise<EventEmitter> {
    logger.debug(`[Module NetappFileSystem] -> putFile -> srcPath [${srcPath}], dstPath [${dstPath}], connectionUuid [${this.connectionUuid}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');
    if (dstPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    const realSrcPath: string = join(new AnyOpsOSSysGetPathModule().filesystem, srcPath);

    const eventEmitter = new EventEmitter();
    const sendPercentage = (percentage: number): number => {
      return percentage;
    };

    // TODO: check file already exists on remote
    // TODO: check if src is a folder
    // TODO: emit percentage
    if (!pathExistsSync(realSrcPath)) throw new Error('resource_invalid');

    this.NetappModule.callSoapApi('file-read-file', {
      data: await readFile(realSrcPath),
      path: dstPath
    }, vfiler);

    return eventEmitter;
  }

  async patchFile(vfiler: string, type: 'copy' | 'move' | 'rename', srcPath: string, dstPath: string): Promise<void> {
    logger.debug(`[Module NetappFileSystem] -> patchFile -> type [${type}], srcPath [${srcPath}], dstPath [${dstPath}], connectionUuid [${this.connectionUuid}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');
    if (dstPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    // TODO check if file/path exists
    if (type === 'copy') {
      // TODO
    }
    if (type === 'move') {
      await this.NetappModule.callSoapApi('file-rename-file', {
        'from-path': srcPath,
        'to-path': dstPath
      }, vfiler);
    }
    if (type === 'rename') {
      await this.NetappModule.callSoapApi('file-rename-file', {
        'from-path': srcPath,
        'to-path': dstPath
      }, vfiler);
    }
  }

  // TODO
  async patchFilePermissions(vfiler: string, type: 'chmod' | 'chown', srcPath: string, permissions: string): Promise<void> {
    logger.debug(`[Module NetappFileSystem] -> patchFilePermissions -> type [${type}], srcPath [${srcPath}], permissions [${permissions}], connectionUuid [${this.connectionUuid}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    // TODO check if file/path exists
    if (type === 'chmod') return;
    if (type === 'chown') return;
  }

  async deleteFile(vfiler: string, srcPath: string): Promise<void> {
    logger.debug(`[Module NetappFileSystem] -> deleteFile -> srcPath [${srcPath}], connectionUuid [${this.connectionUuid}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    // TODO check if is directory or file
    // TODO check if file/path exists
    // <path>/vol/${volume}/${path}</path>
    await this.NetappModule.callSoapApi('file-delete-file', {
      path: srcPath
    }, vfiler);

    // TODO: directory must be empty
    await this.NetappModule.callSoapApi('file-delete-directory', {
      path: srcPath
    }, vfiler);
  }


}
