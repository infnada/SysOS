import { TestBed } from '@angular/core/testing';

import { SysosAppInfrastructureManagerContextMenusService } from './sysos-app-infrastructure-manager-context-menus.service';

describe('SysosAppInfrastructureManagerContextMenusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppInfrastructureManagerContextMenusService = TestBed.get(SysosAppInfrastructureManagerContextMenusService);
    expect(service).toBeTruthy();
  });
});
