import { TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerEditCustomAttributesService } from './sysos-modal-infrastructure-manager-edit-custom-attributes.service';

describe('SysosModalInfrastructureManagerEditCustomAttributesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosModalInfrastructureManagerEditCustomAttributesService = TestBed.get(SysosModalInfrastructureManagerEditCustomAttributesService);
    expect(service).toBeTruthy();
  });
});
