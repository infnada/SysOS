import { TestBed } from '@angular/core/testing';

import { SysosLibNetappUcmService } from './sysos-lib-netapp-ucm.service';

describe('SysosLibNetappUcmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappUcmService = TestBed.get(SysosLibNetappUcmService);
    expect(service).toBeTruthy();
  });
});
