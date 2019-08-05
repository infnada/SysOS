import {DynamicData} from './dynamic-data';

import {HostCpuIdInfo} from './host-cpu-id-info';
import {BoolOption} from './bool-option';
import {IntOption} from './int-option';
import {Int} from './int';
import {Long} from './long';
export interface GuestOsDescriptor extends DynamicData {
  cpuFeatureMask?: HostCpuIdInfo[];
  defaultSecureBoot?: boolean;
  diskUuidEnabled: boolean;
  family: string;
  fullName: string;
  id: string;
  numRecommendedCoresPerSocket?: Int;
  numRecommendedPhysicalSockets?: Int;
  numSupportedCoresPerSocket: Int;
  numSupportedFloppyDevices: Int;
  numSupportedPhysicalSockets: Int;
  persistentMemoryColdGrowthGranularityMB?: Long;
  persistentMemoryColdGrowthSupported?: boolean;
  persistentMemoryHotAddSupported?: boolean;
  persistentMemoryHotGrowthGranularityMB?: Long;
  persistentMemoryHotGrowthSupported?: boolean;
  persistentMemoryHotRemoveSupported?: boolean;
  persistentMemorySupported?: boolean;
  recommendedCdromController: string;
  recommendedColorDepth: Int;
  recommendedDiskController: string;
  recommendedDiskSizeMB: Int;
  recommendedEthernetCard?: string;
  recommendedFirmware: string;
  recommendedMemMB: Int;
  recommendedPersistentMemoryMB?: Long;
  recommendedSCSIController?: string;
  recommendedUSBController?: string;
  smcRecommended: boolean;
  smcRequired: boolean;
  supportedDiskControllerList: string[];
  supportedEthernetCard: string[];
  supportedFirmware: string[];
  supportedForCreate: boolean;
  supportedMaxCPUs: Int;
  supportedMaxMemMB: Int;
  supportedMaxPersistentMemoryMB?: Long;
  supportedMinMemMB: Int;
  supportedMinPersistentMemoryMB?: Long;
  supportedNumDisks: Int;
  supportedUSBControllerList?: string[];
  supportLevel: string;
  supportsCpuHotAdd: boolean;
  supportsCpuHotRemove: boolean;
  supportsHotPlugPCI: boolean;
  supportsMemoryHotAdd: boolean;
  supportsPvscsiControllerForBoot: boolean;
  supportsSecureBoot?: boolean;
  supportsSlaveDisk?: boolean;
  supportsVMI: boolean;
  supportsWakeOnLan: boolean;
  usbRecommended: boolean;
  vbsSupported?: BoolOption;
  vRAMSizeInKB: IntOption;
  vvtdSupported?: BoolOption;
  wakeOnLanEthernetCard?: string[];
}
