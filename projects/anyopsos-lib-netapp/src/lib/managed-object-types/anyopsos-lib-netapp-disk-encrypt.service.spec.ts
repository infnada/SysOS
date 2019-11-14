import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappDiskEncryptService } from './anyopsos-lib-netapp-disk-encrypt.service';

describe('AnyOpsOSLibNetappDiskEncryptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappDiskEncryptService = TestBed.get(AnyOpsOSLibNetappDiskEncryptService);
    expect(service).toBeTruthy();
  });
});
