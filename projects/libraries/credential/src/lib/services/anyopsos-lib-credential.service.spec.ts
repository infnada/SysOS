import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibCredentialService } from './anyopsos-lib-credential.service';

describe('AnyOpsOSLibCredentialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibCredentialService = TestBed.get(AnyOpsOSLibCredentialService);
    expect(service).toBeTruthy();
  });
});
