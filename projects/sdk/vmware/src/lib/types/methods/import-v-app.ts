import {ManagedObjectReference} from '../data/managed-object-reference';
import {ImportSpec} from '../data/import-spec';


export interface ImportVApp {
  _this: ManagedObjectReference;
  spec: ImportSpec;
  folder?: ManagedObjectReference & { $type: 'Folder'; };
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
}