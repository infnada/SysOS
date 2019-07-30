import { TestBed } from '@angular/core/testing';

import { SysosLibNetappNetgroupService } from './sysos-lib-netapp-netgroup.service';

describe('SysosLibNetappNetgroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappNetgroupService = TestBed.get(SysosLibNetappNetgroupService);
    expect(service).toBeTruthy();
  });
});
