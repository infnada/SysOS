import {Injectable} from '@angular/core';

import {timer} from 'rxjs';

import {Socket} from 'ngx-socket-io';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSAppInfrastructureManagerService} from '../anyopsos-app-infrastructure-manager.service';
import {AnyOpsOSAppInfrastructureManagerObjectHelperService} from '../anyopsos-app-infrastructure-manager-object-helper.service';
import {ConnectionKubernetes} from '../../types/connections/connection-kubernetes';
import {ImDataObject} from '../../types/im-data-object';

@Injectable({
  providedIn: 'root'
})
export class AnyopsosAppInfrastructureKubernetesService {

  private subTimeout;

  constructor(private socket: Socket,
              private Modal: AnyOpsOSLibModalService,
              private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService,
              private InfrastructureManagerObjectHelper: AnyOpsOSAppInfrastructureManagerObjectHelperService) {

    this.socket
      .fromEvent('kubernetes__data')
      .subscribe((sockData: { uuid: string, data: any }) => {
        this.parseObject(sockData);
        console.log(sockData);
      });

    this.socket
      .fromEvent('kubernetes__prop')
      .subscribe((sockData: { uuid: string, prop: string, text: string }) => {

        this.InfrastructureManager.getConnectionByUuid(sockData.uuid)[sockData.prop] = sockData.text;

        if (sockData.prop === 'state' && sockData.text === 'connected' && this.Modal.isModalOpened('.window--infrastructure-manager .window__main')) {
          this.Modal.closeModal('.window--infrastructure-manager .window__main');
        }

      });

  }

  initConnection(connection: ConnectionKubernetes): void {
    return this.socket.emit('[new-session]', {
      type: 'kubernetes',
      clusterName: connection.clusterName,
      clusterServer: connection.clusterServer,
      clusterCa: connection.clusterCa,
      credential: connection.credential,
      uuid: connection.uuid
    });
  }

  private parseObject(sockData: { uuid: string, data: any }) {
    const object = sockData.data.obj;

    // Set basic object data
    if (sockData.data.type === 'ADDED' || sockData.data.type === 'MODIFIED') {
      if (object.metadata.ownerReferences && object.metadata.ownerReferences.length !== 1) console.log('multiple', object.metadata.ownerReferences);

      const objectParent = (object.metadata.ownerReferences ? {
        type: object.metadata.ownerReferences[0].kind,
        name: object.metadata.ownerReferences[0].name
      } : object.metadata.namespace ? {
        type: 'Namespace',
        name: object.metadata.namespace
      } : null);

      const newObj: ImDataObject = {
        name: object.metadata.name,
        type: object.kind,
        info: {
          uuid: `${sockData.uuid};\u003c${object.metadata.name}:${object.kind}\u003e`,
          mainUuid: sockData.uuid,
          obj: {
            type: object.kind,
            name: object.metadata.name
          },
          parent: objectParent,
          data: object
        }
      };

      if (sockData.data.type === 'ADDED') {
        this.InfrastructureManager.getConnectionByUuid(sockData.uuid).data.Data.push(newObj as ImDataObject);
      } else if (sockData.data.type === 'MODIFIED') {
        let oldObj = this.InfrastructureManagerObjectHelper.getObjectByUuid(sockData.uuid, newObj.info.uuid);
        oldObj = newObj;
      }

      // Tell InfrastructureManager that we changed connections data
      if (this.subTimeout) this.subTimeout.unsubscribe();
      this.subTimeout = timer(1000).subscribe(() => {
        this.InfrastructureManager.connectionsUpdated();
      });
    }
  }
}
