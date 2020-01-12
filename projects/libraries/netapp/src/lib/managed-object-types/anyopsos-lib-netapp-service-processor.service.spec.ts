import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappServiceProcessorService } from './anyopsos-lib-netapp-service-processor.service';

describe('AnyOpsOSLibNetappServiceProcessorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappServiceProcessorService = TestBed.get(AnyOpsOSLibNetappServiceProcessorService);
    expect(service).toBeTruthy();
  });
});
