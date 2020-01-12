import { TestBed } from '@angular/core/testing';

import { AnyOpsOSExtLibEasypiechartService } from './anyopsos-ext-lib-easy-pie-chart.service';

describe('AnyOpsOSExtLibEasypiechartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSExtLibEasypiechartService = TestBed.get(AnyOpsOSExtLibEasypiechartService);
    expect(service).toBeTruthy();
  });
});
