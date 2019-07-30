import { TestBed } from '@angular/core/testing';

import { SysosLibNetappNdmpService } from './sysos-lib-netapp-ndmp.service';

describe('SysosLibNetappNdmpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappNdmpService = TestBed.get(SysosLibNetappNdmpService);
    expect(service).toBeTruthy();
  });
});
