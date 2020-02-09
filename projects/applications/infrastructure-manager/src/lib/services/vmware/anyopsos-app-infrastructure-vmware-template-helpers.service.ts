import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureVmwareTemplateHelpersService {

  constructor() {
  }

  isVmObject(vmwareObject) {
    return vmwareObject.type === 'VirtualMachine' || vmwareObject.type === 'VirtualApp';
  }

  getObjectType(vmwareObject) {
    return vmwareObject.type;
  }
}
