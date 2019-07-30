import { TestBed } from '@angular/core/testing';

import { SysosLibNetappSnapmirrorService } from './sysos-lib-netapp-snapmirror.service';

describe('SysosLibNetappSnapmirrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappSnapmirrorService = TestBed.get(SysosLibNetappSnapmirrorService);
    expect(service).toBeTruthy();
  });
});
