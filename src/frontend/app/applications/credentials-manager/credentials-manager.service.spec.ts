import { TestBed } from '@angular/core/testing';

import { CredentialsManagerService } from './credentials-manager.service';

describe('CredentialsManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CredentialsManagerService = TestBed.get(CredentialsManagerService);
    expect(service).toBeTruthy();
  });
});
