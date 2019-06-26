import { TestBed } from '@angular/core/testing';

import { SysosLibSelectableService } from './sysos-lib-selectable.service';

describe('SysosLibSelectableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibSelectableService = TestBed.get(SysosLibSelectableService);
    expect(service).toBeTruthy();
  });
});
