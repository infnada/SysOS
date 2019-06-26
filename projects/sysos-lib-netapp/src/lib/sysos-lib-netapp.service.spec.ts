import { TestBed } from '@angular/core/testing';

import { SysosLibNetappService } from './sysos-lib-netapp.service';

describe('SysosLibNetappService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappService = TestBed.get(SysosLibNetappService);
    expect(service).toBeTruthy();
  });
});
