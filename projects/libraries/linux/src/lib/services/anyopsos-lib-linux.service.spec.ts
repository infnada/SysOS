import { TestBed } from '@angular/core/testing';

import { AnyopsosLibLinuxService } from './anyopsos-lib-linux.service';

describe('AnyopsosLibLinuxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyopsosLibLinuxService = TestBed.get(AnyopsosLibLinuxService);
    expect(service).toBeTruthy();
  });
});
