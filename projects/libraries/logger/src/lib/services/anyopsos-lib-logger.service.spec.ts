import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibLoggerService } from './anyopsos-lib-logger.service';

describe('AnyOpsOSLibLoggerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibLoggerService = TestBed.get(AnyOpsOSLibLoggerService);
    expect(service).toBeTruthy();
  });
});
