import { TestBed } from '@angular/core/testing';

import { SysosLibNetappStorageInitiatorService } from './sysos-lib-netapp-storage-initiator.service';

describe('SysosLibNetappStorageInitiatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappStorageInitiatorService = TestBed.get(SysosLibNetappStorageInitiatorService);
    expect(service).toBeTruthy();
  });
});
