import { TestBed } from '@angular/core/testing';

import { SysosLibNetappAggrService } from './sysos-lib-netapp-aggr.service';

describe('SysosLibNetappAggrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappAggrService = TestBed.get(SysosLibNetappAggrService);
    expect(service).toBeTruthy();
  });
});
