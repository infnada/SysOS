import { TestBed } from '@angular/core/testing';

import { AnyOpsOSExtLibSpinJsService } from './anyopsos-ext-lib-spin-js.service';

describe('AnyOpsOSExtLibSpinJsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSExtLibSpinJsService = TestBed.get(AnyOpsOSExtLibSpinJsService);
    expect(service).toBeTruthy();
  });
});
