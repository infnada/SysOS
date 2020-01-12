import { TestBed } from '@angular/core/testing';

import { AnyOpsOSExtLibPerfectscrollbarService } from './anyopsos-ext-lib-perfect-scrollbar.service';

describe('AnyOpsOSExtLibPerfectscrollbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSExtLibPerfectscrollbarService = TestBed.get(AnyOpsOSExtLibPerfectscrollbarService);
    expect(service).toBeTruthy();
  });
});
