import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareResourcePlanningManagerService } from './sysos-lib-vmware-resource-planning-manager.service';

describe('SysosLibVmwareResourcePlanningManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareResourcePlanningManagerService = TestBed.get(SysosLibVmwareResourcePlanningManagerService);
    expect(service).toBeTruthy();
  });
});
