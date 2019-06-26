import { TestBed } from '@angular/core/testing';

import { SysosLibApplicationService } from './sysos-lib-application.service';

describe('SysosLibApplicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibApplicationService = TestBed.get(SysosLibApplicationService);
    expect(service).toBeTruthy();
  });
});
