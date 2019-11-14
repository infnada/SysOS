import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibExtGaugejsService } from './anyopsos-lib-ext-gaugejs.service';

describe('AnyOpsOSLibExtGaugejsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibExtGaugejsService = TestBed.get(AnyOpsOSLibExtGaugejsService);
    expect(service).toBeTruthy();
  });
});
