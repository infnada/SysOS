import { TestBed } from '@angular/core/testing';

import { SysosLibNetappTemplateManagementService } from './sysos-lib-netapp-template-management.service';

describe('SysosLibNetappTemplateManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappTemplateManagementService = TestBed.get(SysosLibNetappTemplateManagementService);
    expect(service).toBeTruthy();
  });
});
