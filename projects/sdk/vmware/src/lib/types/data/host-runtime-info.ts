import {DynamicData} from './dynamic-data';

import {HostSystemConnectionState} from '../enums/host-system-connection-state';
import {CryptoKeyId} from './crypto-key-id';
import {ClusterDasFdmHostState} from './cluster-das-fdm-host-state';
import {HealthSystemRuntime} from './health-system-runtime';
import {HostRuntimeInfoNetworkRuntimeInfo} from './host-runtime-info-network-runtime-info';
import {HostSystemPowerState} from '../enums/host-system-power-state';
import {HostTpmDigestInfo} from './host-tpm-digest-info';
import {HostVFlashManagerVFlashResourceRunTimeInfo} from './host-v-flash-manager-v-flash-resource-run-time-info';
import {VsanHostRuntimeInfo} from './vsan-host-runtime-info';

export interface HostRuntimeInfo extends DynamicData {
  bootTime?: string;
  connectionState: HostSystemConnectionState;
  cryptoKeyId?: CryptoKeyId;
  cryptoState?: string;
  dasHostState?: ClusterDasFdmHostState;
  healthSystemRuntime?: HealthSystemRuntime;
  hostMaxVirtualDiskCapacity?: number;
  inMaintenanceMode: boolean;
  inQuarantineMode?: boolean;
  networkRuntimeInfo?: HostRuntimeInfoNetworkRuntimeInfo;
  powerState: HostSystemPowerState;
  standbyMode?: string;
  tpmPcrValues?: HostTpmDigestInfo[];
  vFlashResourceRuntimeInfo?: HostVFlashManagerVFlashResourceRunTimeInfo;
  vsanRuntimeInfo?: VsanHostRuntimeInfo;
}