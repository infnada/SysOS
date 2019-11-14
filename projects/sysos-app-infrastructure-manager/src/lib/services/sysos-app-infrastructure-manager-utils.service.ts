import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SysosAppInfrastructureManagerUtilsService {

  constructor() {
  }

  ipInSameSubnet(addr1: string, addr2: string, mask: string): boolean {
    const res1 = [];
    const res2 = [];
    const arr1 = addr1.split('.');
    const arr2 = addr2.split('.');
    const arrmask  = mask.split('.');

    for (let i = 0; i < arr1.length; i++) {
      res1.push(parseInt(arr1[i], 10) & parseInt(arrmask[i], 10));
      res2.push(parseInt(arr2[i], 10) & parseInt(arrmask[i], 10));
    }
    return res1.join('.') === res2.join('.');
  };
}
