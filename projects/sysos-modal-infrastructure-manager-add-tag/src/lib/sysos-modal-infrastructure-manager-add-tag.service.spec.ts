import { TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerAddTagService } from './sysos-modal-infrastructure-manager-add-tag.service';

describe('SysosModalInfrastructureManagerAddTagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosModalInfrastructureManagerAddTagService = TestBed.get(SysosModalInfrastructureManagerAddTagService);
    expect(service).toBeTruthy();
  });
});
