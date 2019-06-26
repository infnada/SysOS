import { TestBed } from '@angular/core/testing';

import { SysosLibUserService } from './sysos-lib-user.service';

describe('SysosLibUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibUserService = TestBed.get(SysosLibUserService);
    expect(service).toBeTruthy();
  });
});
