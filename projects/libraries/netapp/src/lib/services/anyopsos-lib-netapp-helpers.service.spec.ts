import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappHelpersService } from './anyopsos-lib-netapp-helpers.service';

describe('AnyOpsOSLibNetappHelpersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappHelpersService = TestBed.get(AnyOpsOSLibNetappHelpersService);
    expect(service).toBeTruthy();
  });
});
