import { TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerImportDistributedSwitchService } from './sysos-modal-infrastructure-manager-import-distributed-switch.service';

describe('SysosModalInfrastructureManagerImportDistributedSwitchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosModalInfrastructureManagerImportDistributedSwitchService = TestBed.get(SysosModalInfrastructureManagerImportDistributedSwitchService);
    expect(service).toBeTruthy();
  });
});
