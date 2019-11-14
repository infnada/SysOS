import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappIscsiService } from './anyopsos-lib-netapp-iscsi.service';

describe('AnyOpsOSLibNetappIscsiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappIscsiService = TestBed.get(AnyOpsOSLibNetappIscsiService);
    expect(service).toBeTruthy();
  });
});
