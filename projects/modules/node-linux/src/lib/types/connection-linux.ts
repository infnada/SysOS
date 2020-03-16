import {Connection} from '@anyopsos/backend-core/app/types/connection';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

export interface ConnectionLinux extends Connection {
  type: 'linux';
  host: string;
  port: number;
  credential: string;
  hopServerUuid: string;
  data: {
    Base: {
      name: string;
    };
    Data: (DataObject & { info: { data: any } })[];
  };
}
