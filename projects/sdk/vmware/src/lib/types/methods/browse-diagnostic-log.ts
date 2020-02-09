import {ManagedObjectReference} from '../data/managed-object-reference';


export interface BrowseDiagnosticLog {
  _this: ManagedObjectReference;
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
  key: string;
  start?: number;
  lines?: number;
}