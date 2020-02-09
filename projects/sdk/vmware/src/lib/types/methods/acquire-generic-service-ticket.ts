import {ManagedObjectReference} from '../data/managed-object-reference';
import {SessionManagerServiceRequestSpec} from '../data/session-manager-service-request-spec';


export interface AcquireGenericServiceTicket {
  _this: ManagedObjectReference;
  spec: SessionManagerServiceRequestSpec;
}