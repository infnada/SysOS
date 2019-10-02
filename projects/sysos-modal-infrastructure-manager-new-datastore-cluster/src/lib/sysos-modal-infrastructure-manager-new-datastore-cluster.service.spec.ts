import { TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerNewDatastoreClusterService } from './sysos-modal-infrastructure-manager-new-datastore-cluster.service';

describe('SysosModalInfrastructureManagerNewDatastoreClusterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosModalInfrastructureManagerNewDatastoreClusterService = TestBed.get(SysosModalInfrastructureManagerNewDatastoreClusterService);
    expect(service).toBeTruthy();
  });
});
