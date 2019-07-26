import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareListViewService } from './sysos-lib-vmware-list-view.service';

describe('SysosLibVmwareListViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareListViewService = TestBed.get(SysosLibVmwareListViewService);
    expect(service).toBeTruthy();
  });
});
