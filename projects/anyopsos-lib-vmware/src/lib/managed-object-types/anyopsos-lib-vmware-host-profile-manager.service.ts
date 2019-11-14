import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareHostProfileManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  ApplyEntitiesConfig_Task() {

  }

  ApplyHostConfig_Task() {

  }

  CheckAnswerFileStatus_Task() {

  }

  CompositeHostProfile_Task() {

  }

  CreateDefaultProfile() {

  }

  ExportAnswerFile_Task() {

  }

  GenerateConfigTaskList() {

  }

  GenerateHostConfigTaskSpec_Task() {

  }

  GenerateHostProfileTaskList_Task() {

  }

  QueryAnswerFileStatus() {

  }

  QueryHostProfileMetadata() {

  }

  QueryProfileStructure() {

  }

  RetrieveAnswerFile() {

  }

  RetrieveAnswerFileForProfile() {

  }

  RetrieveHostCustomizations() {

  }

  RetrieveHostCustomizationsForProfile() {

  }

  UpdateAnswerFile_Task() {

  }

  UpdateHostCustomizations_Task() {

  }

  ValidateHostProfileComposition_Task() {

  }
}
