import {getSocketIO} from 'socket-controllers';

import {AnyOpsOSConfigFileModule} from '@anyopsos/module-config-file';
import {DataObject} from '@anyopsos/backend/app/types/data-object';

import {NETAPP_CONFIG_FILE} from './anyopsos-module-netapp.constants';

export class AnyOpsOSNetappDataRefresherModule {

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
  parseObjects(type: string, objects: any[]): void {
    objects.forEach((obj) => {
      return this.parseObject(type, obj);
    });
  }

  private parseObject(type: string, object: any): void {
    // TODO
    const parent: { name: string; type: string; } = {
      name: 'todo',
      type: 'todo'
    };

    let name: string = '';
    let idName: string = '';

    if (type === 'netiface') {
      name = object['interface-name'];
      idName = object['lif-uuid'];
    }

    if (type === 'fcpiface') {
      name = object['interface-name'];
      idName = object['lif-uuid'];
    }

    if (type === 'fcpadapter') {
      name = object['info-name'];
      idName = object.adapter;
    }

    if (type === 'vserver') {
      name = object['vserver-name'];
      idName = object.uuid;
    }

    if (type === 'volume') {
      name = object['volume-id-attributes'].name;
      idName = object['volume-id-attributes'].uuid;
    }

    if (type === 'lun') {
      name = object.uuid; // TODO
      idName = object.uuid;
    }

    if (type === 'snapshot') {
      name = object.name;
      idName = object['snapshot-instance-uuid'];
    }

    const obj = {
      type,
      name: idName
    };

    const objectUuid: string = `${this.connectionUuid}#netapp;\u003c${object.name}:${object.type}\u003e`;
    const newObj: DataObject ={
      name,
      type: obj.type,
      info: {
        uuid: objectUuid,
        mainUuid: this.connectionUuid,
        parent,
        obj,
        data: object
      }
    };

    // Patch data object
    this.ConfigFileModule.patch(NETAPP_CONFIG_FILE, newObj, this.connectionUuid, objectUuid);
    getSocketIO().to(this.workspaceUuid).emit('[netapp-data]', {
      connectionUuid: this.connectionUuid,
      data: {
        op: 'patch',
        data: {
          newObj
        }
      }
    });
  }

}
