import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibCredentialStateService } from './anyopsos-lib-credential-state.service';

describe('AnyOpsOSLibCredentialStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibCredentialStateService = TestBed.get(AnyOpsOSLibCredentialStateService);
    expect(service).toBeTruthy();
  });
});
