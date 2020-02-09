import {InsufficientStandbyResource} from './insufficient-standby-resource';


export interface InsufficientStandbyCpuResource extends InsufficientStandbyResource {
  available: number;
  requested: number;
}