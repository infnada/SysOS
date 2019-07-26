import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareSimpleCommandService } from './sysos-lib-vmware-simple-command.service';

describe('SysosLibVmwareSimpleCommandService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareSimpleCommandService = TestBed.get(SysosLibVmwareSimpleCommandService);
    expect(service).toBeTruthy();
  });
});
