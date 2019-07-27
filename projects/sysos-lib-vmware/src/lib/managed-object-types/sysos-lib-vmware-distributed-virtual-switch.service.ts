import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareDistributedVirtualSwitchService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  AddDVPortgroup_Task() {

  }

  AddNetworkResourcePool() {

  }

  CreateDVPortgroup_Task() {

  }

  DvsReconfigureVmVnicNetworkResourcePool_Task() {

  }

  DVSRollback_Task() {

  }

  EnableNetworkResourceManagement() {

  }

  FetchDVPortKeys() {

  }

  FetchDVPorts() {

  }

  LookupDvPortGroup() {

  }

  MergeDvs_Task() {

  }

  MoveDVPort_Task() {

  }

  PerformDvsProductSpecOperation_Task() {

  }

  QueryUsedVlanIdInDvs() {

  }

  ReconfigureDVPort_Task() {

  }

  ReconfigureDvs_Task() {

  }

  RectifyDvsHost_Task() {

  }

  RefreshDVPortState() {

  }

  RemoveNetworkResourcePool() {

  }

  UpdateDvsCapability() {

  }

  UpdateDVSHealthCheckConfig_Task() {

  }

  UpdateNetworkResourcePool() {

  }
}
