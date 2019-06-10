import { TestBed } from '@angular/core/testing';

import { InfrastructureManagerNetappService } from './infrastructure-manager-netapp.service';

describe('InfrastructureManagerNetappService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfrastructureManagerNetappService = TestBed.get(InfrastructureManagerNetappService);
    expect(service).toBeTruthy();
  });
});
