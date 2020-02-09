import {InsufficientStandbyResource} from './insufficient-standby-resource';


export interface InsufficientStandbyMemoryResource extends InsufficientStandbyResource {
  available: number;
  requested: number;
}