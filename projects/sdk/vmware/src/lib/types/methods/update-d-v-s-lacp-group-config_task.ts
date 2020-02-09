import {ManagedObjectReference} from '../data/managed-object-reference';
import {VMwareDvsLacpGroupSpec} from '../data/v-mware-dvs-lacp-group-spec';


export interface UpdateDVSLacpGroupConfig_Task {
  _this: ManagedObjectReference;
  lacpGroupSpec: VMwareDvsLacpGroupSpec[];
}