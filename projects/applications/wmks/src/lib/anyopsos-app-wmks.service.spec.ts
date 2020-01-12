import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppWmksService } from './anyopsos-app-wmks.service';

describe('AnyOpsOSAppWmksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppWmksService = TestBed.get(AnyOpsOSAppWmksService);
    expect(service).toBeTruthy();
  });
});
