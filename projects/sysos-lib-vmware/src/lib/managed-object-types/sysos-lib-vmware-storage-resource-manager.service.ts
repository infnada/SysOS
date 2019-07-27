import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareStorageResourceManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  ApplyStorageDrsRecommendation_Task() {

  }

  ApplyStorageDrsRecommendationToPod_Task() {

  }

  CancelStorageDrsRecommendation() {

  }

  ConfigureDatastoreIORM_Task() {

  }

  ConfigureStorageDrsForPod_Task() {

  }

  QueryDatastorePerformanceSummary() {

  }

  QueryIORMConfigOption() {

  }

  RecommendDatastores() {

  }

  RefreshStorageDrsRecommendation() {

  }

  RefreshStorageDrsRecommendationsForPod_Task() {

  }

  ValidateStoragePodConfig() {

  }
}
