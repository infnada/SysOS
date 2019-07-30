import { TestBed } from '@angular/core/testing';

import { SysosLibNetappSesService } from './sysos-lib-netapp-ses.service';

describe('SysosLibNetappSesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappSesService = TestBed.get(SysosLibNetappSesService);
    expect(service).toBeTruthy();
  });
});
