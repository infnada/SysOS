import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappClockService } from './anyopsos-lib-netapp-clock.service';

describe('AnyOpsOSLibNetappClockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappClockService = TestBed.get(AnyOpsOSLibNetappClockService);
    expect(service).toBeTruthy();
  });
});
