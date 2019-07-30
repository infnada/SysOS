import { TestBed } from '@angular/core/testing';

import { SysosLibNetappNfsService } from './sysos-lib-netapp-nfs.service';

describe('SysosLibNetappNfsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappNfsService = TestBed.get(SysosLibNetappNfsService);
    expect(service).toBeTruthy();
  });
});
