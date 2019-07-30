import { TestBed } from '@angular/core/testing';

import { SysosLibNetappJobService } from './sysos-lib-netapp-job.service';

describe('SysosLibNetappJobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappJobService = TestBed.get(SysosLibNetappJobService);
    expect(service).toBeTruthy();
  });
});
