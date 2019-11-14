import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppSshService } from './anyopsos-app-ssh.service';

describe('AnyOpsOSAppSshService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppSshService = TestBed.get(AnyOpsOSAppSshService);
    expect(service).toBeTruthy();
  });
});
