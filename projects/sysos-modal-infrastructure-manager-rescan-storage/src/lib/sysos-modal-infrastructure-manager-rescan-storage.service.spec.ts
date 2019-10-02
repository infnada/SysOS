import { TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerRescanStorageService } from './sysos-modal-infrastructure-manager-rescan-storage.service';

describe('SysosModalInfrastructureManagerRescanStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosModalInfrastructureManagerRescanStorageService = TestBed.get(SysosModalInfrastructureManagerRescanStorageService);
    expect(service).toBeTruthy();
  });
});
