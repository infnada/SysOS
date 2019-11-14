import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappStorageIscsiInitiatorService } from './anyopsos-lib-netapp-storage-iscsi-initiator.service';

describe('AnyOpsOSLibNetappStorageIscsiInitiatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappStorageIscsiInitiatorService = TestBed.get(AnyOpsOSLibNetappStorageIscsiInitiatorService);
    expect(service).toBeTruthy();
  });
});
