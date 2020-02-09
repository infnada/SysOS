import {DVSUplinkPortPolicy} from './d-v-s-uplink-port-policy';


export interface DVSNameArrayUplinkPortPolicy extends DVSUplinkPortPolicy {
  uplinkPortName: string[];
}