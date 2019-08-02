export interface HostNatServiceNameServiceSpec {
  dnsAutoDetect: boolean;
  dnsNameServer?: string[];
  dnsPolicy: string;
  dnsRetries: number;
  dnsTimeout: number;
  nbdsTimeout: number;
  nbnsRetries: number;
  nbnsTimeout: number;
}
