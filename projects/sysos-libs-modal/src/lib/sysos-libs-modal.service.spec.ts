import { TestBed } from '@angular/core/testing';

import { SysosLibsModalService } from './sysos-libs-modal.service';

describe('SysosLibsModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibsModalService = TestBed.get(SysosLibsModalService);
    expect(service).toBeTruthy();
  });
});
