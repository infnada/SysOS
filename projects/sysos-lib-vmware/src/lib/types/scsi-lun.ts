import {HostDevice} from './host-device';

import {ScsiLunDurableName} from './scsi-lun-durable-name';
import {ScsiLunCapabilities} from './scsi-lun-capabilities';
import {ScsiLunDescriptor} from './scsi-lun-descriptor';
import {Int} from './int';
import {Byte} from './byte';
export interface ScsiLun extends HostDevice {
  alternateName?: ScsiLunDurableName[];
  canonicalName?: string;
  capabilities?: ScsiLunCapabilities;
  descriptor?: ScsiLunDescriptor[];
  displayName?: string;
  durableName?: ScsiLunDurableName;
  key?: string;
  model?: string;
  operationalState: string[];
  protocolEndpoint?: boolean;
  queueDepth?: Int;
  revision?: string;
  scsiLevel?: Int;
  serialNumber?: string;
  standardInquiry?: Byte[];
  uuid: string;
  vendor?: string;
  vStorageSupport?: string;
}
