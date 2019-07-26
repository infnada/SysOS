import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareMessageBusProxyService } from './sysos-lib-vmware-message-bus-proxy.service';

describe('SysosLibVmwareMessageBusProxyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareMessageBusProxyService = TestBed.get(SysosLibVmwareMessageBusProxyService);
    expect(service).toBeTruthy();
  });
});
