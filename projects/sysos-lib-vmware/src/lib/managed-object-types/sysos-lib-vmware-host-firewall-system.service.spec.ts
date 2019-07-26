import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostFirewallSystemService } from './sysos-lib-vmware-host-firewall-system.service';

describe('SysosLibVmwareHostFirewallSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostFirewallSystemService = TestBed.get(SysosLibVmwareHostFirewallSystemService);
    expect(service).toBeTruthy();
  });
});
