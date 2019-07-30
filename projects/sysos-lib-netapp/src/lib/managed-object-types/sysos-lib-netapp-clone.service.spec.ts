import { TestBed } from '@angular/core/testing';

import { SysosLibNetappCloneService } from './sysos-lib-netapp-clone.service';

describe('SysosLibNetappCloneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappCloneService = TestBed.get(SysosLibNetappCloneService);
    expect(service).toBeTruthy();
  });
});
