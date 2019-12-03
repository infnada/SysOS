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
export class AnyOpsOSAppInfrastructureKubernetesService {

  private subTimeout;

  constructor(private socket: Socket,
              private Modal: AnyOpsOSLibModalService,
              private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService,
              private InfrastructureManagerObjectHelper: AnyOpsOSAppInfrastructureManagerObjectHelperService) {

    this.socket
      .fromEvent('kubernetes__data')
      .subscribe((sockData: { uuid: string, data: any }) => {
        this.parseObject(sockData);
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

    this.createConnectionFolders(connection.uuid);

    return this.socket.emit('[new-session]', {
      type: 'kubernetes',
      clusterName: connection.clusterName,
      clusterServer: connection.clusterServer,
      clusterCa: connection.clusterCa,
      credential: connection.credential,
      uuid: connection.uuid
    });
  }

  private createConnectionFolders(connectionUuid: string) {
    const folders = [
      'Nodes',
      'Cluster Roles',
      'Cluster Role Bindings',
      'Persistent Volumes',
      'Storage Classes',
      'Namespaces',
    ];

    folders.forEach((folder: string) => {
      const newObj: ImDataObject = {
        name: folder,
        type: 'Folder',
        info: {
          uuid: `${connectionUuid};\u003c${folder}:Folder\u003e`,
          mainUuid: connectionUuid,
          obj: {
            type: 'Folder',
            name: folder
          },
          parent: null,
          data: {}
        }
      };

      this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Data.push(newObj as ImDataObject);
    });
  }

  private createNamespaceFolders(connectionUuid: string, object: ImDataObject) {

    const parent = object.info.obj;
    const folders = [
      'Ingresses',
      'Services',
      'Endpoints',
      'Config Maps',
      'Secrets',
      'Persistent Volume Claims',
      'Service Accounts',
      'Roles',
      'Role Bindings'
    ];

    folders.forEach((folder: string) => {
      const newObj: ImDataObject = {
        name: folder,
        type: 'Folder',
        info: {
          uuid: `${connectionUuid};\u003c${object.name}${folder}:Folder\u003e`,
          mainUuid: connectionUuid,
          obj: {
            type: 'Folder',
            name: object.name + folder
          },
          parent,
          data: {}
        }
      };

      this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Data.push(newObj as ImDataObject);
    });

  }

  private parseObject(sockData: { uuid: string, data: any }) {
    const object = sockData.data.obj;

    if (sockData.data.type === 'DELETED') {
      const objectUuid = `${sockData.uuid};\u003c${object.metadata.name}:${object.kind}\u003e`;

      this.InfrastructureManager.getConnectionByUuid(sockData.uuid).data.Data.splice(
        this.InfrastructureManager.getConnectionByUuid(sockData.uuid).data.Data.findIndex((i) => {
          return i.info.uuid === objectUuid;
        }
      ), 1);
    }

    // Set basic object data
    if (sockData.data.type === 'ADDED' || sockData.data.type === 'MODIFIED') {
      if (object.metadata.ownerReferences && object.metadata.ownerReferences.length !== 1) console.log('multiple', object.metadata.ownerReferences);

      const objectParent = (object.metadata.ownerReferences ? {
        type: object.metadata.ownerReferences[0].kind,
        name: object.metadata.ownerReferences[0].name
      } :

      object.kind === 'Event' ? {
        type: object.involvedObject.kind,
        name: object.involvedObject.name,
      } :

      object.metadata.namespace ?

        object.kind === 'Endpoints' ? {
          type: 'Folder',
          name: object.metadata.namespace + 'Endpoints'
        } : object.kind === 'Ingress' ? {
          type: 'Folder',
          name: object.metadata.namespace + 'Ingresses'
        } : object.kind === 'Service' ? {
          type: 'Folder',
          name: object.metadata.namespace + 'Services'
        } : object.kind === 'ConfigMap' ? {
          type: 'Folder',
          name: object.metadata.namespace + 'Config Maps'
        } : object.kind === 'PersistentVolumeClaim' ? {
          type: 'Folder',
          name: object.metadata.namespace + 'Persistent Volume Claims'
        } : object.kind === 'Secret' ? {
          type: 'Folder',
          name: object.metadata.namespace + 'Secrets'
        } : object.kind === 'ServiceAccount' ? {
          type: 'Folder',
          name: object.metadata.namespace + 'Service Accounts'
        } : object.kind === 'RoleBinding' ? {
          type: 'Folder',
          name: object.metadata.namespace + 'Role Bindings'
        } : object.kind === 'Role' ? {
          type: 'Folder',
          name: object.metadata.namespace + 'Roles'
        } : {
          type: 'Namespace',
          name: object.metadata.namespace
        } :

      object.kind === 'PersistentVolume' ? {
        type: 'Folder',
        name: 'Persistent Volumes'
      } : object.kind === 'ClusterRole' ? {
        type: 'Folder',
        name: 'Cluster Roles'
      } : object.kind === 'StorageClass' ? {
        type: 'Folder',
        name: 'Storage Classes'
      } : object.kind === 'ClusterRoleBinding' ? {
        type: 'Folder',
        name: 'Cluster Role Bindings'
      } : object.kind === 'Node' ? {
        type: 'Folder',
        name: 'Nodes'
      } : object.kind === 'Namespace' ? {
        type: 'Folder',
        name: 'Namespaces'
      } : null);

      // ControllerRevision
      // VolumeAttachment
      // Event
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

      // Create Namespaces folders
      if (sockData.data.type === 'ADDED' && object.kind === 'Namespace') {
        this.createNamespaceFolders(sockData.uuid, newObj);
      }

      if (sockData.data.type === 'ADDED') {
        this.InfrastructureManager.getConnectionByUuid(sockData.uuid).data.Data.push(newObj as ImDataObject);
      } else if (sockData.data.type === 'MODIFIED') {
        let oldObj = this.InfrastructureManagerObjectHelper.getObjectByUuid(sockData.uuid, newObj.info.uuid);
        oldObj = newObj;
      }
    }

    // Tell InfrastructureManager that we changed connections data
    if (this.subTimeout) this.subTimeout.unsubscribe();
    this.subTimeout = timer(1000).subscribe(() => {
      this.InfrastructureManager.connectionsUpdated();
    });

    if (sockData.data.type !== 'ADDED' && sockData.data.type !== 'MODIFIED' && sockData.data.type !== 'DELETED') console.log(sockData);
  }
}
