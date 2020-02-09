import {Connection} from '@anyopsos/backend/app/types/connection';
import {DataObject} from '@anyopsos/backend/app/types/data-object';

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
