import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareCustomizationSpecManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  CheckCustomizationResources() {

  }

  CreateCustomizationSpec() {

  }

  CustomizationSpecItemToXml() {

  }

  DeleteCustomizationSpec() {

  }

  DoesCustomizationSpecExist() {

  }

  DuplicateCustomizationSpec() {

  }

  GetCustomizationSpec() {

  }

  OverwriteCustomizationSpec() {

  }

  RenameCustomizationSpec() {

  }

  XmlToCustomizationSpecItem() {

  }
}
