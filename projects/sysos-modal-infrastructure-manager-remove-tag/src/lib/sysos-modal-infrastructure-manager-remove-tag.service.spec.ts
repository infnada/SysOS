import { TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerRemoveTagService } from './sysos-modal-infrastructure-manager-remove-tag.service';

describe('SysosModalInfrastructureManagerRemoveTagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosModalInfrastructureManagerRemoveTagService = TestBed.get(SysosModalInfrastructureManagerRemoveTagService);
    expect(service).toBeTruthy();
  });
});
