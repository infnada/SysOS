import { TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerAddCategoryService } from './sysos-modal-infrastructure-manager-add-category.service';

describe('SysosModalInfrastructureManagerAddCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosModalInfrastructureManagerAddCategoryService = TestBed.get(SysosModalInfrastructureManagerAddCategoryService);
    expect(service).toBeTruthy();
  });
});
