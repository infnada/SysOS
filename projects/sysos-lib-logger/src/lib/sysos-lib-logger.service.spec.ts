import { TestBed } from '@angular/core/testing';

import { SysosLibLoggerService } from './sysos-lib-logger.service';

describe('SysosLibLoggerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibLoggerService = TestBed.get(SysosLibLoggerService);
    expect(service).toBeTruthy();
  });
});
