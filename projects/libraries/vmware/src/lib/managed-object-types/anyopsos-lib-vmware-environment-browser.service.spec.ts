import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareEnvironmentBrowserService } from './anyopsos-lib-vmware-environment-browser.service';

describe('AnyOpsOSLibVmwareEnvironmentBrowserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareEnvironmentBrowserService = TestBed.get(AnyOpsOSLibVmwareEnvironmentBrowserService);
    expect(service).toBeTruthy();
  });
});
