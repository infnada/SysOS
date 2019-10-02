import { TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerNewDatastoreService } from './sysos-modal-infrastructure-manager-new-datastore.service';

describe('SysosModalInfrastructureManagerNewDatastoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosModalInfrastructureManagerNewDatastoreService = TestBed.get(SysosModalInfrastructureManagerNewDatastoreService);
    expect(service).toBeTruthy();
  });
});
