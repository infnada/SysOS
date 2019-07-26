export interface SnmpIface {
  interfaceId: number;
  interfaceName: string;
  ip?: string;
  netmask?: string;
  mtu?: number;
  traffic_in?: number;
  traffic_out?: number;
  type?: string;
  speed?: number;
  admin_status?: string;
}
