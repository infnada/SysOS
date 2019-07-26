import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareContainerViewService } from './sysos-lib-vmware-container-view.service';

describe('SysosLibVmwareContainerViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareContainerViewService = TestBed.get(SysosLibVmwareContainerViewService);
    expect(service).toBeTruthy();
  });
});
