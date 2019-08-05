import {InsufficientStandbyResource} from './insufficient-standby-resource';
import {Long} from './long';

export interface InsufficientStandbyMemoryResource extends InsufficientStandbyResource {
  available: Long;
  requested: Long;
}
