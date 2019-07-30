import { TestBed } from '@angular/core/testing';

import { SysosLibNetappVolumeService } from './sysos-lib-netapp-volume.service';

describe('SysosLibNetappVolumeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappVolumeService = TestBed.get(SysosLibNetappVolumeService);
    expect(service).toBeTruthy();
  });
});
