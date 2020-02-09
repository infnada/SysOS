import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibModalRegisteredStateService } from './anyopsos-lib-modal-registered-state.service';

describe('AnyOpsOSLibModalRegisteredStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibModalRegisteredStateService = TestBed.get(AnyOpsOSLibModalRegisteredStateService);
    expect(service).toBeTruthy();
  });
});
