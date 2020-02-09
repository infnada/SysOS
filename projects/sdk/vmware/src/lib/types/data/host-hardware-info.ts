import {DynamicData} from './dynamic-data';

import {HostBIOSInfo} from './host-b-i-o-s-info';
import {HostCpuIdInfo} from './host-cpu-id-info';
import {HostCpuInfo} from './host-cpu-info';
import {HostCpuPackage} from './host-cpu-package';
import {HostCpuPowerManagementInfo} from './host-cpu-power-management-info';
import {HostNumaInfo} from './host-numa-info';
import {HostPciDevice} from './host-pci-device';
import {HostPersistentMemoryInfo} from './host-persistent-memory-info';
import {HostReliableMemoryInfo} from './host-reliable-memory-info';
import {HostSystemInfo} from './host-system-info';

export interface HostHardwareInfo extends DynamicData {
  biosInfo?: HostBIOSInfo;
  cpuFeature?: HostCpuIdInfo[];
  cpuInfo: HostCpuInfo;
  cpuPkg: HostCpuPackage[];
  cpuPowerManagementInfo?: HostCpuPowerManagementInfo;
  memorySize: number;
  numaInfo?: HostNumaInfo;
  pciDevice?: HostPciDevice[];
  persistentMemoryInfo?: HostPersistentMemoryInfo;
  reliableMemoryInfo?: HostReliableMemoryInfo;
  smcPresent: boolean;
  systemInfo: HostSystemInfo;
}