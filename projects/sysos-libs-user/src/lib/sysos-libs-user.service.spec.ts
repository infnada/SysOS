import { TestBed } from '@angular/core/testing';

import { SysosLibsUserService } from './sysos-libs-user.service';

describe('SysosLibsUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibsUserService = TestBed.get(SysosLibsUserService);
    expect(service).toBeTruthy();
  });
});
