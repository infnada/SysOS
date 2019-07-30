import { TestBed } from '@angular/core/testing';

import { SysosLibNetappSystemService } from './sysos-lib-netapp-system.service';

describe('SysosLibNetappSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappSystemService = TestBed.get(SysosLibNetappSystemService);
    expect(service).toBeTruthy();
  });
});
