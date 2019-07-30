import { TestBed } from '@angular/core/testing';

import { SysosLibNetappClockService } from './sysos-lib-netapp-clock.service';

describe('SysosLibNetappClockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappClockService = TestBed.get(SysosLibNetappClockService);
    expect(service).toBeTruthy();
  });
});
