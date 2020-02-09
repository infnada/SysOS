import {pathExistsSync, readJSON, unlink, writeJson} from 'fs-extra';
import {v4 as uuid} from 'uuid';
import {join} from 'path';

import {AnyOpsOSGetPathModule} from '@anyopsos/module-get-path';
import {AnyOpsOSWorkspaceModule} from '@anyopsos/module-workspace';

import {DataObject} from '@anyopsos/backend/app/types/data-object';
import {ConfigFile} from './types/config-file';
import {ConfigFileData} from './types/config-file-data';


export class AnyOpsOSConfigFileModule {

  private readonly GetPathModule: AnyOpsOSGetPathModule;
  private readonly WorkspaceModule!: AnyOpsOSWorkspaceModule;

  private readonly workSpacePath!: string;

  constructor(private readonly userUuid?: string,
              private readonly sessionUuid?: string,
              private readonly workspaceUuid?: string) {

    this.GetPathModule = new AnyOpsOSGetPathModule();

    // If no data is passed to the constructor, only can load config from main /etc path
    // TODO cookieSessionKey is visible to everyone...
    if (this.userUuid && this.sessionUuid && this.workspaceUuid) {
      this.WorkspaceModule = new AnyOpsOSWorkspaceModule(this.userUuid, this.sessionUuid);

      this.workSpacePath = this.WorkspaceModule.getWorkspaceConfigPath(this.workspaceUuid);
    }
  }

  /**
   * Gets a full resource or specific by uuid
   */


  async get(filePath: string): Promise<ConfigFile>;
  async get(filePath: string, configUuid: string): Promise<ConfigFileData>;
  async get(filePath: string, configUuid: string, dataUuid: string): Promise<DataObject>;
  async get(filePath: string, configUuid?: string, dataUuid?: string): Promise<ConfigFileData | ConfigFile | DataObject> {
    let configPath: string;

    // Security check
    if (filePath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    if (this.workSpacePath) {
      configPath = join(this.workSpacePath, filePath);
    } else {
      configPath = join(this.GetPathModule.etc, filePath);
    }

    if (!pathExistsSync(configPath)) throw new Error('resource_not_found');

    const configFile: ConfigFile = await readJSON(configPath);

    /**
     * Full resource
     */
    if (!configUuid) return configFile;

    /**
     * By uuid
     */
    const currentConfigData: ConfigFileData | undefined = configFile.find((entry: ConfigFileData) => entry.uuid === configUuid);
    if (!currentConfigData) throw new Error('config_resource_not_found');
    if (!dataUuid) return currentConfigData;

    /**
     * By data object uuid
     */
    if (!currentConfigData.data?.Data) throw new Error('resource_invalid');

    const currentObjectData: DataObject | undefined = currentConfigData.data.Data.find((entry: DataObject) => entry.info.uuid === dataUuid);
    if (!currentObjectData) throw new Error('data_resource_not_found');
    return currentObjectData;
  }

  /**
   * Creates a full resource or specific by uuid
   */
  async put(filePath: string, fileData: ConfigFile): Promise<ConfigFile>;
  async put(filePath: string, fileData: ConfigFileData, configUuid: string): Promise<ConfigFileData>;
  async put(filePath: string, fileData: DataObject, configUuid: string, dataUuid: string): Promise<DataObject>;
  async put(filePath: string, fileData: ConfigFileData | ConfigFile | DataObject, configUuid?: string, dataUuid?: string): Promise<ConfigFile | ConfigFileData | DataObject> {
    let configPath: string;

    // Security check
    if (filePath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    if (this.workSpacePath) {
      configPath = join(this.workSpacePath, filePath);
    } else {
      configPath = join(this.GetPathModule.etc, filePath);
    }

    /**
     * Full resource
     */
    if (Array.isArray(fileData)) {

      // Full resource can't contain a configUuid or dataUuid. configUuid & dataUuid are only valid to specify a child resource
      if (configUuid || dataUuid) throw new Error('resource_invalid');

      // If file already exists, this should be a PATCH
      if (pathExistsSync(configPath)) throw new Error('resource_already_exists');

      // Make sure all configs in configData contains an uuid
      await Promise.all(fileData.map(async (data: ConfigFileData) => {
        if (!data.uuid) data.uuid = await uuid();
      }));

      await writeJson(
        configPath,
        fileData,
        {spaces: 2}
      );

      return fileData;
    }

    /**
     * By uuid
     */
    if (!configUuid) throw new Error('resource_invalid');

    // If file not exists, this should be a PUT without configUuid
    if (!pathExistsSync(configPath)) throw new Error('resource_not_found');

    const configFile: ConfigFile = await readJSON(configPath);
    const currentConfigData: ConfigFileData | undefined = configFile.find((entry: ConfigFileData) => entry.uuid === configUuid);

    if (!dataUuid) {

      // Check if configUuid already exists. It will throw error if it exists, must do a PATCH instead of a PUT
      if (currentConfigData) throw new Error('config_resource_already_exists');

      // Supplied fileData.uuid and configUuid must be equal uuid can't be overridden
      // @ts-ignore TODO
      if (fileData.uuid && fileData.uuid !== configUuid) throw new Error('child_resource_missmatch');

      // If fileData.uuid was not supplied, set it as configUuid
      // @ts-ignore TODO
      if (!fileData.uuid) fileData.uuid = configUuid;

      configFile.push(fileData as ConfigFileData);

      await writeJson(
        configPath,
        configFile,
        {spaces: 2}
      );

      return fileData;
    }

    /**
     * By data object uuid
     */
    if (!currentConfigData) throw new Error('config_resource_not_found');
    if (!currentConfigData.data?.Data) throw new Error('resource_invalid');

    const currentObjectData: DataObject | undefined = currentConfigData.data.Data.find((entry: DataObject) => entry.info.uuid === dataUuid);

    // Must do a PATCH instead of a PUT
    if (currentObjectData) throw new Error('data_resource_already_exists');

    currentConfigData.data.Data.push(fileData as DataObject);
    await writeJson(
      configPath,
      configFile,
      {spaces: 2}
    );

    return fileData;
  }

  /**
   * Updates a full resource or specific by uuid
   */
  async patch(filePath: string, fileData: ConfigFile): Promise<{ uuid: string; }>;
  async patch(filePath: string, fileData: ConfigFileData, configUuid: string): Promise<{ uuid: string; }>;
  async patch(filePath: string, fileData: DataObject, configUuid: string, dataUuid: string): Promise<{ uuid: string; }>;
  async patch(filePath: string, fileData: ConfigFileData | ConfigFile | DataObject, configUuid?: string, dataUuid?: string): Promise<ConfigFile | { uuid: string; }> {
    let configPath: string;

    // Security check
    if (filePath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    if (this.workSpacePath) {
      configPath = join(this.workSpacePath, filePath);
    } else {
      configPath = join(this.GetPathModule.etc, filePath);
    }

    // If file not found, this should be a PUT
    if (!pathExistsSync(configPath)) throw new Error('resource_not_found');

    /**
     * Full resource
     */
    if (Array.isArray(fileData)) {

      // Full resource can't contain a configUuid or dataUuid. configUuid & dataUuid are only valid to specify a child resource
      if (configUuid || dataUuid) throw new Error('resource_invalid');

      // Make sure all configs in configData contains an uuid
      await Promise.all(fileData.map(async (data: ConfigFileData) => {
        if (!data.uuid) data.uuid = await uuid();
      }));

      await writeJson(
        configPath,
        fileData,
        { spaces: 2 }
      );

      return fileData;
    }

    /**
     * By uuid
     */
    if (!configUuid) throw new Error('resource_invalid');

    const configFile: ConfigFile = await readJSON(configPath);
    const itemIndex: number = configFile.findIndex((entry: ConfigFileData) => entry.uuid === configUuid);

    // If uuid not exists, this should be a PUT
    if (itemIndex === -1) throw new Error('config_resource_not_found');

    if (!dataUuid) {

      // TODO
      fileData = fileData as ConfigFileData;

      // Make sure fileData contains an uuid
      if (!fileData.uuid) fileData.uuid = await uuid();

      configFile[itemIndex] = fileData;

      await writeJson(
        configPath,
        configFile,
        { spaces: 2 }
      );

      return { uuid: fileData.uuid };
    }

    /**
     * By data object uuid
     */
    const {data: DOdata} = configFile[itemIndex];

    if (!DOdata?.Data) throw new Error('resource_invalid');

    // TODO
    fileData = fileData as DataObject;

    const dataIndex: number = DOdata.Data.findIndex((entry: DataObject) => entry.info.uuid === dataUuid);

    // If uuid not exists, this should be a PUT
    if (dataIndex === -1) throw new Error('data_resource_not_found');

    DOdata.Data[dataIndex] = fileData;

    await writeJson(
      configPath,
      configFile,
      {spaces: 2}
    );

    return { uuid: fileData.info.uuid };


  }

  /**
   * Deletes a full resource or specific by uuid
   */
  async delete(filePath: string, configUuid?: string, dataUuid?: string): Promise<void> {
    let configPath: string;

    // Security check
    if (filePath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    if (this.workSpacePath) {
      configPath = join(this.workSpacePath, filePath);
    } else {
      configPath = join(this.GetPathModule.etc, filePath);
    }

    if (!pathExistsSync(configPath)) throw new Error('resource_not_found');

    /**
     * Full resource
     */
    if (!configUuid) return unlink(configPath);

    const configFile = await readJSON(configPath);

    const itemIndex = configFile.findIndex((entry: ConfigFileData) => entry.uuid === configUuid);
    if (itemIndex === -1) throw new Error('child_resource_not_found');

    /**
     * By uuid
     */
    if (!dataUuid) {
      configFile.splice(
        configFile.findIndex((i: ConfigFileData) => {
            return i.uuid === configUuid;
          }
        ), 1);
    }

    /**
     * By data object uuid
     */
    const {data: DOdata} = configFile[itemIndex];

    if (!DOdata?.Data) throw new Error('resource_invalid');
    const dataIndex: number = DOdata.Data.findIndex((entry: DataObject) => entry.info.uuid === dataUuid);

    // If uuid not exists, this should be a PUT
    if (dataIndex === -1) throw new Error('data_resource_not_found');

    DOdata.Data.splice(
      DOdata.Data.findIndex((i: DataObject) => {
          return i.info.uuid === dataUuid;
        }
      ), 1);

    await writeJson(
      configPath,
      configFile,
      { spaces: 2 }
    );

    return;
  }

}
