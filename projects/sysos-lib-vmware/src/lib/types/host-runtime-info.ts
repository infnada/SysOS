import {DynamicData} from './dynamic-data';

import {HostSystemConnectionState} from './host-system-connection-state';
import {CryptoKeyId} from './crypto-key-id';
import {ClusterDasFdmHostState} from './cluster-das-fdm-host-state';
import {HealthSystemRuntime} from './health-system-runtime';
import {HostRuntimeInfoNetworkRuntimeInfo} from './host-runtime-info-network-runtime-info';
import {HostSystemPowerState} from './host-system-power-state';
import {HostTpmDigestInfo} from './host-tpm-digest-info';
import {HostVFlashManagerVFlashResourceRunTimeInfo} from './host-v-flash-manager-v-flash-resource-run-time-info';
import {VsanHostRuntimeInfo} from './vsan-host-runtime-info';
import {DateTime} from './date-time';
import {Long} from './long';
export interface HostRuntimeInfo extends DynamicData {
  bootTime?: DateTime;
  connectionState: HostSystemConnectionState;
  cryptoKeyId?: CryptoKeyId;
  cryptoState?: string;
  dasHostState?: ClusterDasFdmHostState;
  healthSystemRuntime?: HealthSystemRuntime;
  hostMaxVirtualDiskCapacity?: Long;
  inMaintenanceMode: boolean;
  inQuarantineMode?: boolean;
  networkRuntimeInfo?: HostRuntimeInfoNetworkRuntimeInfo;
  powerState: HostSystemPowerState;
  standbyMode?: string;
  tpmPcrValues?: HostTpmDigestInfo[];
  vFlashResourceRuntimeInfo?: HostVFlashManagerVFlashResourceRunTimeInfo;
  vsanRuntimeInfo?: VsanHostRuntimeInfo;
}
