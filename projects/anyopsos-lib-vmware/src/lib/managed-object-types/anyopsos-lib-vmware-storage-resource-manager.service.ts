import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareStorageResourceManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
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
