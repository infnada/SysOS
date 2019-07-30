import { TestBed } from '@angular/core/testing';

import { SysosLibNetappNetService } from './sysos-lib-netapp-net.service';

describe('SysosLibNetappNetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappNetService = TestBed.get(SysosLibNetappNetService);
    expect(service).toBeTruthy();
  });
});
