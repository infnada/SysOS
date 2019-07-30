import { TestBed } from '@angular/core/testing';

import { SysosLibNetappCfService } from './sysos-lib-netapp-cf.service';

describe('SysosLibNetappCfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappCfService = TestBed.get(SysosLibNetappCfService);
    expect(service).toBeTruthy();
  });
});
