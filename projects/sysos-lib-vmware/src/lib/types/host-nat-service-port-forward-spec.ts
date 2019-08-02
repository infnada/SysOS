export interface HostNatServicePortForwardSpec {
  guestIpAddress: string;
  guestPort: number;
  hostPort: number;
  name: string;
  type: string;
}
