import { TestBed } from '@angular/core/testing';

import { SshService } from './ssh.service';

describe('SshService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SshService = TestBed.get(SshService);
    expect(service).toBeTruthy();
  });
});
