import {ManagedObjectReference} from '../data/managed-object-reference';


export interface FindByDnsName {
  _this: ManagedObjectReference;
  datacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
  dnsName: string;
  vmSearch: boolean;
}