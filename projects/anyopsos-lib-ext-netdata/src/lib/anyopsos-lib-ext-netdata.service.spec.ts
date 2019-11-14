import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibExtNetdataService } from './anyopsos-lib-ext-netdata.service';

describe('AnyOpsOSLibExtNetdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibExtNetdataService = TestBed.get(AnyOpsOSLibExtNetdataService);
    expect(service).toBeTruthy();
  });
});
