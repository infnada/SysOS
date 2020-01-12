import {pathExistsSync, readJSON, writeJson, unlink} from 'fs-extra';
import {v4 as uuid} from 'uuid';

import {ConfigFile} from './types/config-file';
import {ConfigFileData} from './types/config-file-data';

export class AnyOpsOSConfigFileModule {

  constructor() {
  }

  /**
   * Gets a full resource or specific by uuid
   */
  async get(filePath: string, configUuid?: string): Promise<ConfigFile | ConfigFileData> {
    // Security check
    if (filePath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    if (!pathExistsSync(filePath)) throw new Error('resource_not_found');

    const configFile: ConfigFile = await readJSON(filePath);

    /**
     * Full resource
     */
    if (!configUuid) return configFile;

    /**
     * By uuid
     */
    const currentConfigData = configFile.find((entry: ConfigFileData) => entry.uuid === configUuid);
    if (!currentConfigData) throw new Error('child_resource_not_found');
    return currentConfigData;
  }

  /**
   * Creates a full resource or specific by uuid
   */
  async put(filePath: string, fileData: ConfigFileData, configUuid?: string): Promise<ConfigFile | ConfigFileData> {
    // Security check
    if (filePath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    /**
     * Full resource
     */
    if (!configUuid) {

      // If file already exists, this should be a PATCH
      if (pathExistsSync(filePath)) throw new Error('resource_already_exists');

      // Make sure fileData contains an uuid
      if (!fileData.uuid) fileData.uuid = await uuid();

      await writeJson(
        filePath,
        [fileData],
        {spaces: 2}
      );

      return [fileData] as ConfigFile;
    }

    /**
     * By uuid
     */
    // If file not exists, this should be a PUT without configUuid
    if (!pathExistsSync(filePath)) throw new Error('resource_not_found');

    // Supplied fileData.uuid and configUuid must be equal or the check of "already_exists" will not work properly
    if (fileData.uuid && fileData.uuid !== configUuid) throw new Error('child_resource_missmatch');

    const configFile: ConfigFile = await readJSON(filePath);

    // Check if configUuid already exists. It will throw error if it exists, must do a PATCH instead of a PUT
    const itemIndex = configFile.findIndex((entry: ConfigFileData) => entry.uuid === configUuid);
    if (itemIndex) throw new Error('child_resource_already_exists');

    // If fileData.uuid was not supplied, set it as configUuid
    if (!fileData.uuid) fileData.uuid = configUuid;
    configFile.push(fileData);

    await writeJson(
      filePath,
      configFile,
      {spaces: 2}
    );

    return fileData;
  }

  /**
   * Updates a full resource or specific by uuid
   */
  async patch(filePath: string, fileData: ConfigFileData, configUuid?: string): Promise<ConfigFile | { uuid: string; }> {
    // Security check
    if (filePath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    // If file not found, this should be a PUT
    if (!pathExistsSync(filePath)) throw new Error('resource_not_found');

    /**
     * Full resource
     */
    if (!configUuid) {

      // Make sure fileData contains an uuid
      if (!fileData.uuid) fileData.uuid = await uuid();

      await writeJson(
        filePath,
        [fileData],
        { spaces: 2 }
      );

      return [fileData];
    }

    /**
     * By uuid
     */
    const configFile: ConfigFile = await readJSON(filePath);
    const itemIndex = configFile.findIndex((entry: ConfigFileData) => entry.uuid === configUuid);

    // If uuid not exists, this should be a PUT
    if (!itemIndex) throw new Error('child_resource_not_found');

    // Make sure fileData contains an uuid
    if (!fileData.uuid) fileData.uuid = await uuid();

    configFile[itemIndex] = fileData;

    await writeJson(
      filePath,
      configFile,
      { spaces: 2 }
    );

    return { uuid: fileData.uuid };
  }

  /**
   * Deletes a full resource or specific by uuid
   */
  async delete(filePath: string, configUuid?: string): Promise<void> {
    // Security check
    if (filePath.indexOf('\0') !== -1) throw new Error('param_security_stop');

    if (!pathExistsSync(filePath)) throw new Error('resource_not_found');

    /**
     * Full resource
     */
    if (!configUuid) return unlink(filePath);

    /**
     * By uuid
     */
    const configFile = await readJSON(filePath);

    const itemIndex = configFile.findIndex((entry: ConfigFileData) => entry.uuid === configUuid);
    if (!itemIndex) throw new Error('child_resource_not_found');

    const newFileData = configFile.filter((entry: ConfigFileData) => entry.uuid !== configUuid);

    await writeJson(
      filePath,
      newFileData,
      { spaces: 2 }
    );

    return;
  }

}
