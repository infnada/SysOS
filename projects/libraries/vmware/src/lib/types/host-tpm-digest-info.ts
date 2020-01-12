import {HostDigestInfo} from './host-digest-info';
import {Int} from './int';

export interface HostTpmDigestInfo extends HostDigestInfo {
  pcrNumber: Int;
}
