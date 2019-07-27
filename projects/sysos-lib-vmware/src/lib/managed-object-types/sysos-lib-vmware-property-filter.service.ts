import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwarePropertyFilterService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  DestroyPropertyFilter() {

  }
}
