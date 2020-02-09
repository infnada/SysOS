import {HostTargetTransport} from './host-target-transport';


export interface HostInternetScsiTargetTransport extends HostTargetTransport {
  address?: string[];
  iScsiAlias: string;
  iScsiName: string;
}