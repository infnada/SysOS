import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappVolumeService } from './anyopsos-lib-netapp-volume.service';

describe('AnyOpsOSLibNetappVolumeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappVolumeService = TestBed.get(AnyOpsOSLibNetappVolumeService);
    expect(service).toBeTruthy();
  });
});
