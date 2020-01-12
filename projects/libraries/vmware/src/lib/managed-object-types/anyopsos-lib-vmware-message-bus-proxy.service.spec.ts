import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareMessageBusProxyService } from './anyopsos-lib-vmware-message-bus-proxy.service';

describe('AnyOpsOSLibVmwareMessageBusProxyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareMessageBusProxyService = TestBed.get(AnyOpsOSLibVmwareMessageBusProxyService);
    expect(service).toBeTruthy();
  });
});
