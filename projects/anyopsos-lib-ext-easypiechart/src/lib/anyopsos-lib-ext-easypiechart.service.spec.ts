import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibExtEasypiechartService } from './anyopsos-lib-ext-easypiechart.service';

describe('AnyOpsOSLibExtEasypiechartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibExtEasypiechartService = TestBed.get(AnyOpsOSLibExtEasypiechartService);
    expect(service).toBeTruthy();
  });
});
