import { TestBed } from '@angular/core/testing';

import { SysosLibNetappIscsiService } from './sysos-lib-netapp-iscsi.service';

describe('SysosLibNetappIscsiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappIscsiService = TestBed.get(SysosLibNetappIscsiService);
    expect(service).toBeTruthy();
  });
});
