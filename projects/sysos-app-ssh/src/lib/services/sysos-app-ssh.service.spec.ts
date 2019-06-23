import { TestBed } from '@angular/core/testing';

import { SysosAppSshService } from './sysos-app-ssh.service';

describe('SysosAppSshService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppSshService = TestBed.get(SysosAppSshService);
    expect(service).toBeTruthy();
  });
});
