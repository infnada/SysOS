import { TestBed } from '@angular/core/testing';

import { SysosLibsApplicationService } from './sysos-libs-application.service';

describe('SysosLibsApplicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibsApplicationService = TestBed.get(SysosLibsApplicationService);
    expect(service).toBeTruthy();
  });
});
