import { TestBed } from '@angular/core/testing';

import { SysosLibNetappCoredumpService } from './sysos-lib-netapp-coredump.service';

describe('SysosLibNetappCoredumpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappCoredumpService = TestBed.get(SysosLibNetappCoredumpService);
    expect(service).toBeTruthy();
  });
});
