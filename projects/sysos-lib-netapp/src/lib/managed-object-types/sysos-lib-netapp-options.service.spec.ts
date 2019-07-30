import { TestBed } from '@angular/core/testing';

import { SysosLibNetappOptionsService } from './sysos-lib-netapp-options.service';

describe('SysosLibNetappOptionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappOptionsService = TestBed.get(SysosLibNetappOptionsService);
    expect(service).toBeTruthy();
  });
});
