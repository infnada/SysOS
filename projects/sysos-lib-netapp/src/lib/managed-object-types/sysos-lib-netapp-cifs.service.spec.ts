import { TestBed } from '@angular/core/testing';

import { SysosLibNetappCifsService } from './sysos-lib-netapp-cifs.service';

describe('SysosLibNetappCifsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappCifsService = TestBed.get(SysosLibNetappCifsService);
    expect(service).toBeTruthy();
  });
});
