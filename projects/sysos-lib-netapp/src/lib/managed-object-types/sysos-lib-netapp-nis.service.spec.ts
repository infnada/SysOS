import { TestBed } from '@angular/core/testing';

import { SysosLibNetappNisService } from './sysos-lib-netapp-nis.service';

describe('SysosLibNetappNisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappNisService = TestBed.get(SysosLibNetappNisService);
    expect(service).toBeTruthy();
  });
});
