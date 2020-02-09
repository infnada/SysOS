import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibModalHelpersService } from './anyopsos-lib-modal-helpers.service';

describe('AnyOpsOSLibModalHelpersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibModalHelpersService = TestBed.get(AnyOpsOSLibModalHelpersService);
    expect(service).toBeTruthy();
  });
});
