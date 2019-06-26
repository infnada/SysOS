import { TestBed } from '@angular/core/testing';

import { SysosLibModalService } from './sysos-lib-modal.service';

describe('SysosLibModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibModalService = TestBed.get(SysosLibModalService);
    expect(service).toBeTruthy();
  });
});
