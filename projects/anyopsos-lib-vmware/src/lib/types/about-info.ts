import {DynamicData} from './dynamic-data';

export interface AboutInfo extends DynamicData {
  apiType: string;
  apiVersion: string;
  build: string;
  fullName: string;
  instanceUuid?: string;
  licenseProductName?: string;
  licenseProductVersion?: string;
  localeBuild?: string;
  localeVersion?: string;
  name: string;
  osType: string;
  productLineId: string;
  vendor: string;
  version: string;
}
