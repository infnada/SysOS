export interface VMWareFirewallRule  {
  key: string;
  allowedHosts: {
    allIp: boolean;
    ipAddress?: string;
  };
}
