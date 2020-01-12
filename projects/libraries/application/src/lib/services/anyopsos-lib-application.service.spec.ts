import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibApplicationService } from './anyopsos-lib-application.service';

describe('AnyOpsOSLibApplicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibApplicationService = TestBed.get(AnyOpsOSLibApplicationService);
    expect(service).toBeTruthy();
  });
});
