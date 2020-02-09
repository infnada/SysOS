import {HostDigestInfo} from './host-digest-info';


export interface HostTpmDigestInfo extends HostDigestInfo {
  pcrNumber: number;
}