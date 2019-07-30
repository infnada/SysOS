import { TestBed } from '@angular/core/testing';

import { SysosLibNetappVserverService } from './sysos-lib-netapp-vserver.service';

describe('SysosLibNetappVserverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappVserverService = TestBed.get(SysosLibNetappVserverService);
    expect(service).toBeTruthy();
  });
});
