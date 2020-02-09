import {DynamicData} from './dynamic-data';


export interface VimVasaProvider extends DynamicData {
  name?: string;
  selfSignedCertificate?: string;
  uid?: string;
  url: string;
}