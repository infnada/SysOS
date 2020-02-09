import {HostHostBusAdapter} from './host-host-bus-adapter';


export interface HostSerialAttachedHba extends HostHostBusAdapter {
  nodeWorldWideName: string;
}