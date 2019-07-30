import { TestBed } from '@angular/core/testing';

import { SysosLibNetappSectraceService } from './sysos-lib-netapp-sectrace.service';

describe('SysosLibNetappSectraceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappSectraceService = TestBed.get(SysosLibNetappSectraceService);
    expect(service).toBeTruthy();
  });
});
