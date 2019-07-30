import { TestBed } from '@angular/core/testing';

import { SysosLibNetappLicenseV2Service } from './sysos-lib-netapp-license-v2.service';

describe('SysosLibNetappLicenseV2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappLicenseV2Service = TestBed.get(SysosLibNetappLicenseV2Service);
    expect(service).toBeTruthy();
  });
});
