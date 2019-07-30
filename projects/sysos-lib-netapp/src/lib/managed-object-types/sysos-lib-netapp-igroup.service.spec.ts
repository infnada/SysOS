import { TestBed } from '@angular/core/testing';

import { SysosLibNetappIgroupService } from './sysos-lib-netapp-igroup.service';

describe('SysosLibNetappIgroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappIgroupService = TestBed.get(SysosLibNetappIgroupService);
    expect(service).toBeTruthy();
  });
});
