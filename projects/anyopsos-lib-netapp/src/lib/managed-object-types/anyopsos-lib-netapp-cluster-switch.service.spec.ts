import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappClusterSwitchService } from './anyopsos-lib-netapp-cluster-switch.service';

describe('AnyOpsOSLibNetappClusterSwitchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappClusterSwitchService = TestBed.get(AnyOpsOSLibNetappClusterSwitchService);
    expect(service).toBeTruthy();
  });
});
