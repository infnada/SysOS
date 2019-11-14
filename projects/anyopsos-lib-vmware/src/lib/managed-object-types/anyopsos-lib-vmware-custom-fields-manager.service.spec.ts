import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareCustomFieldsManagerService } from './anyopsos-lib-vmware-custom-fields-manager.service';

describe('AnyOpsOSLibVmwareCustomFieldsManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareCustomFieldsManagerService = TestBed.get(AnyOpsOSLibVmwareCustomFieldsManagerService);
    expect(service).toBeTruthy();
  });
});
