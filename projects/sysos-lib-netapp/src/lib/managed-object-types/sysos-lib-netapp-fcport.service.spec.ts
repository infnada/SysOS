import { TestBed } from '@angular/core/testing';

import { SysosLibNetappFcportService } from './sysos-lib-netapp-fcport.service';

describe('SysosLibNetappFcportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappFcportService = TestBed.get(SysosLibNetappFcportService);
    expect(service).toBeTruthy();
  });
});
