import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareSimpleCommandService } from './anyopsos-lib-vmware-simple-command.service';

describe('AnyOpsOSLibVmwareSimpleCommandService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareSimpleCommandService = TestBed.get(AnyOpsOSLibVmwareSimpleCommandService);
    expect(service).toBeTruthy();
  });
});
