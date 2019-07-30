import { TestBed } from '@angular/core/testing';

import { SysosLibNetappGpoService } from './sysos-lib-netapp-gpo.service';

describe('SysosLibNetappGpoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappGpoService = TestBed.get(SysosLibNetappGpoService);
    expect(service).toBeTruthy();
  });
});
