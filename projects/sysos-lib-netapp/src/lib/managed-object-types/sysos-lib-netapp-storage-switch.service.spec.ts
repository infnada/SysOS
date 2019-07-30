import { TestBed } from '@angular/core/testing';

import { SysosLibNetappStorageSwitchService } from './sysos-lib-netapp-storage-switch.service';

describe('SysosLibNetappStorageSwitchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappStorageSwitchService = TestBed.get(SysosLibNetappStorageSwitchService);
    expect(service).toBeTruthy();
  });
});
