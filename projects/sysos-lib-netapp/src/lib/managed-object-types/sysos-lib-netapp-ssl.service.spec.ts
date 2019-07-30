import { TestBed } from '@angular/core/testing';

import { SysosLibNetappSslService } from './sysos-lib-netapp-ssl.service';

describe('SysosLibNetappSslService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappSslService = TestBed.get(SysosLibNetappSslService);
    expect(service).toBeTruthy();
  });
});
