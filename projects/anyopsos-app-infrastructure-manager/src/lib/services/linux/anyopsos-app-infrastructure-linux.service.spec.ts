import { TestBed } from '@angular/core/testing';

import { AnyopsosAppInfrastructureLinuxService } from './anyopsos-app-infrastructure-linux.service';

describe('AnyopsosAppInfrastructureLinuxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyopsosAppInfrastructureLinuxService = TestBed.get(AnyopsosAppInfrastructureLinuxService);
    expect(service).toBeTruthy();
  });
});
