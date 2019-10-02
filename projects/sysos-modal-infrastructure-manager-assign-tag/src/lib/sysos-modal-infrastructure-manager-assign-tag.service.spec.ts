import { TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerAssignTagService } from './sysos-modal-infrastructure-manager-assign-tag.service';

describe('SysosModalInfrastructureManagerAssignTagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosModalInfrastructureManagerAssignTagService = TestBed.get(SysosModalInfrastructureManagerAssignTagService);
    expect(service).toBeTruthy();
  });
});
