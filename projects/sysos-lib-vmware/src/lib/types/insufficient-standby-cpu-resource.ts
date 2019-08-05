import {InsufficientStandbyResource} from './insufficient-standby-resource';
import {Long} from './long';

export interface InsufficientStandbyCpuResource extends InsufficientStandbyResource {
  available: Long;
  requested: Long;
}
