import {Connection} from '@anyopsos/backend/app/types/connection';
import {DataObject} from '@anyopsos/backend/app/types/data-object';

export interface ConnectionDocker extends Connection {
  type: 'docker';
  credential: string;
  clusterName: string;
  clusterServer: string;
  clusterCa: string;
  hopServerUuid: string;
  data: {
    Base: {
      name: string;
    };
    Data: (DataObject & { info: { data: any } })[];
  };
}
