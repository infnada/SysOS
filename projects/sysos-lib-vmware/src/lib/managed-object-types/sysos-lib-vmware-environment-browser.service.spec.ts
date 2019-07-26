import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareEnvironmentBrowserService } from './sysos-lib-vmware-environment-browser.service';

describe('SysosLibVmwareEnvironmentBrowserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareEnvironmentBrowserService = TestBed.get(SysosLibVmwareEnvironmentBrowserService);
    expect(service).toBeTruthy();
  });
});
