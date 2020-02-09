import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibSshService } from './anyopsos-lib-ssh.service';

describe('AnyOpsOSLibSshService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibSshService = TestBed.get(AnyOpsOSLibSshService);
    expect(service).toBeTruthy();
  });
});
