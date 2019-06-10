import { TestBed } from '@angular/core/testing';

import { InfrastructureManagerService } from './infrastructure-manager.service';

describe('InfrastructureManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfrastructureManagerService = TestBed.get(InfrastructureManagerService);
    expect(service).toBeTruthy();
  });
});
