import { TestBed } from '@angular/core/testing';

import { SysosAppCredentialsManagerService } from './sysos-app-credentials-manager.service';

describe('SysosAppCredentialsManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppCredentialsManagerService = TestBed.get(SysosAppCredentialsManagerService);
    expect(service).toBeTruthy();
  });
});
