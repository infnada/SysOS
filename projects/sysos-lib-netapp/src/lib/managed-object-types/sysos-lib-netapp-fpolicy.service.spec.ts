import { TestBed } from '@angular/core/testing';

import { SysosLibNetappFpolicyService } from './sysos-lib-netapp-fpolicy.service';

describe('SysosLibNetappFpolicyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappFpolicyService = TestBed.get(SysosLibNetappFpolicyService);
    expect(service).toBeTruthy();
  });
});
