import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibAngularMaterialService } from './anyopsos-lib-angular-material.service';

describe('AnyOpsOSLibAngularMaterialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibAngularMaterialService = TestBed.get(AnyOpsOSLibAngularMaterialService);
    expect(service).toBeTruthy();
  });
});
