import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareListViewService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  ModifyListView() {

  }

  ResetListView() {

  }

  ResetListViewFromView() {

  }
}
