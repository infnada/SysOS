import { TestBed } from '@angular/core/testing';

import { SysosAppWmksService } from './sysos-app-wmks.service';

describe('SysosAppWmksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppWmksService = TestBed.get(SysosAppWmksService);
    expect(service).toBeTruthy();
  });
});
