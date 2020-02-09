import {DynamicData} from './dynamic-data';


export interface IscsiDependencyEntity extends DynamicData {
  pnicDevice: string;
  vmhbaName: string;
  vnicDevice: string;
}