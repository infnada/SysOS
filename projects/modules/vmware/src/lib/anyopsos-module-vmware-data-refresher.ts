import {getSocketIO} from 'socket-controllers';

import {AnyOpsOSConfigFileModule} from '@anyopsos/module-config-file';
import {DataObject} from '@anyopsos/backend/app/types/data-object';

import {VMWARE_CONFIG_FILE} from './anyopsos-module-vmware.constants';

export class AnyOpsOSVmwareDataRefresherModule {

  private readonly ConfigFileModule: AnyOpsOSConfigFileModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string,
              private readonly connectionUuid: string) {

    this.ConfigFileModule = new AnyOpsOSConfigFileModule(this.userUuid, this.sessionUuid, this.workspaceUuid);
  }

  /**
   * Set each returned object in an anyOpsOS readable way
   */
  parseObjects(objects: any[]): void {
    objects.forEach((obj) => {
      return this.parseObject(obj);
    });
  }

  private async parseObject(object: any): Promise<void> {

    // Is a modification of existing object
    if (object.kind === 'modify') {

      // Get actual object
      const objectUuid: string = `${this.connectionUuid}#vmware;\u003c${object.info.obj.name}:${object.info.obj.type}\u003e`;
      const existingObject: DataObject = await this.ConfigFileModule.get(VMWARE_CONFIG_FILE, this.connectionUuid, objectUuid);

      existingObject.info.data[object.changeSet.name] = { ...existingObject.info.data[object.changeSet.name], ...object.changeSet.val };

      // Patch data object
      this.ConfigFileModule.patch(VMWARE_CONFIG_FILE, existingObject, this.connectionUuid, objectUuid);
      getSocketIO().to(this.workspaceUuid).emit('[vmware-data]', {
        connectionUuid: this.connectionUuid,
        data: {
          op: 'patch',
          data: {
            existingObject
          }
        }
      });
    }

    // New object
    if (object.kind === 'enter') {

      const objectUuid: string = `${this.connectionUuid}#vmware;\u003c${object.obj.name}:${object.obj.type}\u003e`;

      // Set basic object data
      const newObj: any = {
        type: object.obj.type,
        info: {
          uuid: objectUuid,
          mainUuid: this.connectionUuid,
          obj: object.obj,
          data: {}
        }
      };

      // Check changeSet
      object.changeSet.forEach((obj: any) => {

        // Assign new properties
        if (obj.op === 'assign') {

          if (obj.name === 'name') {
            newObj.name = obj.val;
          } else if (obj.name === 'parent') {
            newObj.info[obj.name] = (obj.val ? obj.val : null);
          } else {
            newObj.info.data[obj.name] = (obj.hasOwnProperty('val') ? obj.val : null);
          }

        }
      });

      // Put data object
      this.ConfigFileModule.put(VMWARE_CONFIG_FILE, newObj, this.connectionUuid, objectUuid);
      getSocketIO().to(this.workspaceUuid).emit('[vmware-data]', {
        connectionUuid: this.connectionUuid,
        data: {
          op: 'put',
          data: {
            newObj
          }
        }
      });
    }
  }

}
