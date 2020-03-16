import {getLogger, Logger} from 'log4js';
import {parse} from 'url';
import {join} from 'path';
import {spawn} from 'child-process-promise';
import {EventEmitter} from 'events';

import {AnyOpsOSSysGetPathModule} from '@anyopsos/module-sys-get-path';
import {HostDatastoreBrowserSearchResults} from '@anyopsos/sdk-vmware/src/lib/types/data/host-datastore-browser-search-results';
import {FileInfo} from '@anyopsos/sdk-vmware/src/lib/types/data/file-info';
import {AnyOpsOSFile} from '@anyopsos/backend-core/app/types/anyopsos-file';

import {AnyOpsOSNodeVmwareModule} from './anyopsos-module-node-vmware.module';
import {AnyOpsOSNodeVmwareSessionStateModule} from './anyopsos-module-node-vmware-session-state';

import {ConnectionVmwareServer} from './types/connection-vmware-server';


const logger: Logger = getLogger('mainLog');

export class AnyOpsOSNodeVmwareFileSystemModule {

  private readonly GetPathModule: AnyOpsOSSysGetPathModule;
  private readonly VmwareModule: AnyOpsOSNodeVmwareModule;
  private readonly VmwareSessionStateModule: AnyOpsOSNodeVmwareSessionStateModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string,
              private readonly connectionUuid: string) {

    this.GetPathModule = new AnyOpsOSSysGetPathModule();
    this.VmwareModule = new AnyOpsOSNodeVmwareModule(this.userUuid, this.sessionUuid, this.workspaceUuid, this.connectionUuid);
    this.VmwareSessionStateModule = new AnyOpsOSNodeVmwareSessionStateModule(this.userUuid, this.sessionUuid, this.workspaceUuid, this.connectionUuid);
  }

  /**
   * Folder API
   *
   * realSrcPath & realDstPath are used for local files since it will be a full path instead of relative
   * srcPath & dstPath are used for remote connections and we keep it "as is"
   */
  async getFolder(srcPath: string, datastoreName: string, datastoreBrowserName: string): Promise<AnyOpsOSFile[]> {
    logger.debug(`[Module VmwareFileSystem] -> getFolder -> srcPath [${srcPath}], connectionUuid [${this.connectionUuid}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    // TODO check if exists
    // @ts-ignore TODO
    const pathFiles: HostDatastoreBrowserSearchResults = await this.VmwareModule.callSoapApi('SearchDatastore_Task', {
      _this: {
        $type: 'HostDatastoreBrowser',
        _value: datastoreBrowserName
      },
      datastorePath: `[${datastoreName}] ${srcPath}`
    });

    // @ts-ignore TODO
    return pathFiles.file?.map((file: FileInfo) => {
      return {
        fileName: file.friendlyName,
        // @ts-ignore
        longName: (file.xsi_type === 'FolderFileInfo' ? 'd---------' : '----------') + ` ${file.owner} ${file.modification} ${file.path}`,
        // @ts-ignore
        attrs: null
      };
    }) as AnyOpsOSFile[];
  }

  async putFolder(dstPath: string, datastoreName: string, datacenterName: string): Promise<void> {
    logger.debug(`[Module VmwareFileSystem] -> putFolder -> dstPath [${dstPath}], connectionUuid [${this.connectionUuid}]`);

    // Security check
    if (dstPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    // TODO check if already exists.
    // @ts-ignore TODO
    return this.VmwareModule.callSoapApi('MakeDirectory', {
      _this: {
        $type: 'FileManager',
        _value: 'FileManager'
      },
      name: `[${datastoreName}] ${dstPath}`,
      datacenter: {
        $type: 'Datacenter',
        _value: datacenterName
      },
      createParentDirectories: true
    });
  }

  /**
   * File API
   *
   * realSrcPath & realDstPath are used for local files since it will be a full path instead of relative
   * srcPath & dstPath are used for remote connections and we keep it "as is"
   */
  // TODO
  async getFile(srcPath: string, dstPath: string): Promise<EventEmitter> {
    logger.debug(`[Module VmwareFileSystem] -> getFile -> srcPath [${srcPath}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');
    if (dstPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    const realDstPath: string = join(this.GetPathModule.filesystem, dstPath);

    const eventEmitter = new EventEmitter();
    const sendPercentage = (percentage: number): number => {
      return percentage;
    };

    return eventEmitter;
  }

  // TODO
  async putFile(srcPath: string, dstPath: string): Promise<EventEmitter> {
    logger.debug(`[Module VmwareFileSystem] -> putFile -> srcPath [${srcPath}], dstPath [${dstPath}], connectionUuid [${this.connectionUuid}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');
    if (dstPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    const realSrcPath: string = join(new AnyOpsOSSysGetPathModule().filesystem, srcPath);

    const eventEmitter = new EventEmitter();
    const sendPercentage = (percentage: number): number => {
      return percentage;
    };

    return eventEmitter;
  }
  async patchFile(type: 'rename', srcPath: string, srcDatastoreName: string, srcDatacenterName: string, dstPath: string): Promise<void>;
  async patchFile(type: 'copy' | 'move', srcPath: string, srcDatastoreName: string, srcDatacenterName: string, dstPath: string, dstDatastoreName: string, dstDatacenterName: string): Promise<void>;
  async patchFile(type: 'copy' | 'move' | 'rename', srcPath: string, srcDatastoreName: string, srcDatacenterName: string, dstPath: string, dstDatastoreName?: string, dstDatacenterName?: string): Promise<void> {
    logger.debug(`[Module VmwareFileSystem] -> patchFile -> type [${type}], srcPath [${srcPath}], dstPath [${dstPath}], connectionUuid [${this.connectionUuid}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');
    if (dstPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    // TODO check if file/path exists src & dst
    if (type === 'copy') {
      // @ts-ignore TODO
      return this.VmwareModule.callSoapApi('CopyDatastoreFile_Task', {
        _this: {
          $type: 'FileManager',
          _value: 'FileManager'
        },
        sourceName: `[${srcDatastoreName}] ${srcPath}`,
        sourceDatacenter: {
          $type: 'Datacenter',
          _value: srcDatacenterName
        },
        destinationName: `[${dstDatastoreName}] ${dstPath}`,
        destinationDatacenter: {
          $type: 'Datacenter',
          _value: dstDatacenterName
        }
      });
    }
    if (type === 'move') {
      // @ts-ignore TODO
      return this.VmwareModule.callSoapApi('MoveDatastoreFile_Task', {
        _this: {
          $type: 'FileManager',
          _value: 'FileManager'
        },
        sourceName: `[${srcDatastoreName}] ${srcPath}`,
        sourceDatacenter: {
          $type: 'Datacenter',
          _value: srcDatacenterName
        },
        destinationName: `[${dstDatastoreName}] ${dstPath}`,
        destinationDatacenter: {
          $type: 'Datacenter',
          _value: dstDatacenterName
        }
      });
    }
    if (type === 'rename') {
      // @ts-ignore TODO
      return this.VmwareModule.callSoapApi('MoveDatastoreFile_Task', {
        _this: {
          $type: 'FileManager',
          _value: 'FileManager'
        },
        sourceName: `[${srcDatastoreName}] ${srcPath}`,
        sourceDatacenter: {
          $type: 'Datacenter',
          _value: srcDatacenterName
        },
        destinationName: `[${srcDatastoreName}] ${dstPath}`,
      });
    }
  }

  // TODO
  async patchFilePermissions(type: 'chmod' | 'chown', srcPath: string, permissions: string): Promise<void> {
    logger.debug(`[Module VmwareFileSystem] -> patchFilePermissions -> type [${type}], srcPath [${srcPath}], permissions [${permissions}], connectionUuid [${this.connectionUuid}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    // TODO check if file/path exists
    if (type === 'chmod') return;
    if (type === 'chown') return;
  }

  async deleteFile(srcPath: string, datastoreName: string, datacenterName: string): Promise<void> {
    logger.debug(`[Module VmwareFileSystem] -> deleteFile -> srcPath [${srcPath}], connectionUuid [${this.connectionUuid}]`);

    // Security check
    if (srcPath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    // TODO check if file/path exists
    // @ts-ignore TODO
    return this.VmwareModule.callSoapApi('DeleteDatastoreFile_Task', {
      _this: {
        $type: 'FileManager',
        _value: 'FileManager'
      },
      name: `[${datastoreName}] ${srcPath}`,
      datacenter: {
        $type: 'Datacenter',
        _value: datacenterName
      }
    });
  }


  /**
   * Uploads a file
   */
  async uploadToDatastore(srcPath: string, datastoreUrl: string): Promise<void> {
    const mainServer: ConnectionVmwareServer = await this.VmwareSessionStateModule.getConnectionMainServer();

    const fileUrl = parse(datastoreUrl).href;
    const realSrcPath = join(this.GetPathModule.filesystem, srcPath);

    await spawn('curl', ['-k', '--user', `${mainServer.credential.username}:${mainServer.credential.password}`, '-X', fileUrl, '-T', realSrcPath], { capture: [ 'stdout', 'stderr' ]});
  }
}
