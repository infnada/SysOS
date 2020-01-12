import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibUtilsService } from './anyopsos-lib-utils.service';

describe('AnyOpsOSLibUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibUtilsService = TestBed.get(AnyOpsOSLibUtilsService);
    expect(service).toBeTruthy();
  });
});
