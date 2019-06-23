import { TestBed } from '@angular/core/testing';

import { SysosLibsSelectableService } from './sysos-libs-selectable.service';

describe('SysosLibsSelectableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibsSelectableService = TestBed.get(SysosLibsSelectableService);
    expect(service).toBeTruthy();
  });
});
