import { TestBed } from '@angular/core/testing';

import { SysosLibNetappQtreeService } from './sysos-lib-netapp-qtree.service';

describe('SysosLibNetappQtreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappQtreeService = TestBed.get(SysosLibNetappQtreeService);
    expect(service).toBeTruthy();
  });
});
