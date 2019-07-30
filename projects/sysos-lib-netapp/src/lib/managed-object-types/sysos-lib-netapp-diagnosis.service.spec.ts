import { TestBed } from '@angular/core/testing';

import { SysosLibNetappDiagnosisService } from './sysos-lib-netapp-diagnosis.service';

describe('SysosLibNetappDiagnosisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappDiagnosisService = TestBed.get(SysosLibNetappDiagnosisService);
    expect(service).toBeTruthy();
  });
});
