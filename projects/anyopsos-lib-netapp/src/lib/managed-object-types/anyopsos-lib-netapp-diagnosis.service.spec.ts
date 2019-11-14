import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappDiagnosisService } from './anyopsos-lib-netapp-diagnosis.service';

describe('AnyOpsOSLibNetappDiagnosisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappDiagnosisService = TestBed.get(AnyOpsOSLibNetappDiagnosisService);
    expect(service).toBeTruthy();
  });
});
