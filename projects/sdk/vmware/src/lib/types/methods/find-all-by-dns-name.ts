import {ManagedObjectReference} from '../data/managed-object-reference';


export interface FindAllByDnsName {
  _this: ManagedObjectReference;
  datacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
  dnsName: string;
  vmSearch: boolean;
}