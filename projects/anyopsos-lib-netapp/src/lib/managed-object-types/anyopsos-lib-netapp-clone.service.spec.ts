import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappCloneService } from './anyopsos-lib-netapp-clone.service';

describe('AnyOpsOSLibNetappCloneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappCloneService = TestBed.get(AnyOpsOSLibNetappCloneService);
    expect(service).toBeTruthy();
  });
});
