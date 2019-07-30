import { TestBed } from '@angular/core/testing';

import { SysosLibNetappStorageIscsiInitiatorService } from './sysos-lib-netapp-storage-iscsi-initiator.service';

describe('SysosLibNetappStorageIscsiInitiatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappStorageIscsiInitiatorService = TestBed.get(SysosLibNetappStorageIscsiInitiatorService);
    expect(service).toBeTruthy();
  });
});
