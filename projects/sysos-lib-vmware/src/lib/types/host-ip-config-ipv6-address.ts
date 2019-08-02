import {DateTime} from "./date-time";

export interface HostIpConfigIpV6Address {
  dadState?: string;
  ipAddress: string;
  lifetime?: DateTime;
  operation?: string;
  origin?: string;
  prefixLength: number;
}
