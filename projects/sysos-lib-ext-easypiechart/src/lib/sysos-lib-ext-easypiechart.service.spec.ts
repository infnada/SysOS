import { TestBed } from '@angular/core/testing';

import { SysosLibExtEasypiechartService } from './sysos-lib-ext-easypiechart.service';

describe('SysosLibExtEasypiechartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibExtEasypiechartService = TestBed.get(SysosLibExtEasypiechartService);
    expect(service).toBeTruthy();
  });
});
