import { TestBed } from '@angular/core/testing';

import { SysosLibNetappHaInterconnectService } from './sysos-lib-netapp-ha-interconnect.service';

describe('SysosLibNetappHaInterconnectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappHaInterconnectService = TestBed.get(SysosLibNetappHaInterconnectService);
    expect(service).toBeTruthy();
  });
});
