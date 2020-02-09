import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibDesktopTaskBarService } from './anyopsos-lib-desktop-task-bar.service';

describe('AnyOpsOSLibDesktopTaskBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibDesktopTaskBarService = TestBed.get(AnyOpsOSLibDesktopTaskBarService);
    expect(service).toBeTruthy();
  });
});
