import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibUserService } from './anyopsos-lib-user.service';

describe('AnyOpsOSLibUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibUserService = TestBed.get(AnyOpsOSLibUserService);
    expect(service).toBeTruthy();
  });
});
