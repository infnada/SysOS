import {HostGraphicsConfigDeviceType} from "./host-graphics-config-device-type";

export interface HostGraphicsConfig {
  deviceType?: HostGraphicsConfigDeviceType[];
  hostDefaultGraphicsType: string;
  sharedPassthruAssignmentPolicy: string;
}
