import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibExtJqueryService } from './anyopsos-lib-ext-jquery.service';

describe('AnyOpsOSLibExtJqueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibExtJqueryService = TestBed.get(AnyOpsOSLibExtJqueryService);
    expect(service).toBeTruthy();
  });
});
