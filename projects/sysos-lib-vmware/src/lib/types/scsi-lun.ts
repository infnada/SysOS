import {HostDevice} from "./host-device";
import {ScsiLunDurableName} from "./scsi-lun-durable-name";
import {ScsiLunCapabilities} from "./scsi-lun-capabilities";
import {ScsiLunDescriptor} from "./scsi-lun-descriptor";

export interface ScsiLun extends HostDevice {
  alternateName?: ScsiLunDurableName[];
  canonicalName?: string;
  capabilities?: ScsiLunCapabilities;
  descriptor?: ScsiLunDescriptor[];
  displayName?: string;
  durableName?: ScsiLunDurableName;
  key?: string;
  lunType: string;
  model?: string;
  operationalState: string[];
  protocolEndpoint?: boolean;
  queueDepth?: number;
  revision?: string;
  scsiLevel?: number;
  serialNumber?: string;
  standardInquiry?: number[];
  uuid: string;
  vendor?: string;
  vStorageSupport?: string;
}
