import { TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerExportSystemLogsService } from './sysos-modal-infrastructure-manager-export-system-logs.service';

describe('SysosModalInfrastructureManagerExportSystemLogsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosModalInfrastructureManagerExportSystemLogsService = TestBed.get(SysosModalInfrastructureManagerExportSystemLogsService);
    expect(service).toBeTruthy();
  });
});
