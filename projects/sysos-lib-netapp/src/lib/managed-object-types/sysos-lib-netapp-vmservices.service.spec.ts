import { TestBed } from '@angular/core/testing';

import { SysosLibNetappVmservicesService } from './sysos-lib-netapp-vmservices.service';

describe('SysosLibNetappVmservicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappVmservicesService = TestBed.get(SysosLibNetappVmservicesService);
    expect(service).toBeTruthy();
  });
});
