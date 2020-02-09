import {DynamicData} from './dynamic-data';


export interface VAppProductInfo extends DynamicData {
  appUrl?: string;
  classId?: string;
  fullVersion?: string;
  instanceId?: string;
  key: number;
  name?: string;
  productUrl?: string;
  vendor?: string;
  vendorUrl?: string;
  version?: string;
}