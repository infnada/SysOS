import { TestBed } from '@angular/core/testing';

import { AnyOpsOSExtLibNetdataService } from './anyopsos-ext-lib-netdata.service';

describe('AnyOpsOSExtLibNetdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSExtLibNetdataService = TestBed.get(AnyOpsOSExtLibNetdataService);
    expect(service).toBeTruthy();
  });
});
