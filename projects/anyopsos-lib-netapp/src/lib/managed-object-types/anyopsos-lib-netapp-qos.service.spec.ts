import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappQosService } from './anyopsos-lib-netapp-qos.service';

describe('AnyOpsOSLibNetappQosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappQosService = TestBed.get(AnyOpsOSLibNetappQosService);
    expect(service).toBeTruthy();
  });
});
