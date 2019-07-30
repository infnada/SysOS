import { TestBed } from '@angular/core/testing';

import { SysosLibNetappPlatformCapService } from './sysos-lib-netapp-platform-cap.service';

describe('SysosLibNetappPlatformCapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappPlatformCapService = TestBed.get(SysosLibNetappPlatformCapService);
    expect(service).toBeTruthy();
  });
});
