import { TestBed } from '@angular/core/testing';

import { SysosLibsNetappService } from './sysos-libs-netapp.service';

describe('SysosLibsNetappService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibsNetappService = TestBed.get(SysosLibsNetappService);
    expect(service).toBeTruthy();
  });
});
