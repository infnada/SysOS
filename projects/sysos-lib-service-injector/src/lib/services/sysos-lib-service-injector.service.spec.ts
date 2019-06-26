import { TestBed } from '@angular/core/testing';

import { SysosLibServiceInjectorService } from './sysos-lib-service-injector.service';

describe('SysosLibServiceInjectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibServiceInjectorService = TestBed.get(SysosLibServiceInjectorService);
    expect(service).toBeTruthy();
  });
});
