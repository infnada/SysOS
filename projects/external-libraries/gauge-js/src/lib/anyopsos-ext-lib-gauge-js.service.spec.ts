import { TestBed } from '@angular/core/testing';

import { AnyOpsOSExtLibGaugejsService } from './anyopsos-ext-lib-gauge-js.service';

describe('AnyOpsOSExtLibGaugejsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSExtLibGaugejsService = TestBed.get(AnyOpsOSExtLibGaugejsService);
    expect(service).toBeTruthy();
  });
});
