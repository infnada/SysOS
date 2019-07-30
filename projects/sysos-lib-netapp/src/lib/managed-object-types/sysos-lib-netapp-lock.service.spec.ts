import { TestBed } from '@angular/core/testing';

import { SysosLibNetappLockService } from './sysos-lib-netapp-lock.service';

describe('SysosLibNetappLockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappLockService = TestBed.get(SysosLibNetappLockService);
    expect(service).toBeTruthy();
  });
});
