import { TestBed } from '@angular/core/testing';

import { VmwareService } from './vmware.service';

describe('VmwareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VmwareService = TestBed.get(VmwareService);
    expect(service).toBeTruthy();
  });
});
