import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibCredentialApiService } from './anyopsos-lib-credential-api.service';

describe('AnyOpsOSLibCredentialApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibCredentialApiService = TestBed.get(AnyOpsOSLibCredentialApiService);
    expect(service).toBeTruthy();
  });
});
