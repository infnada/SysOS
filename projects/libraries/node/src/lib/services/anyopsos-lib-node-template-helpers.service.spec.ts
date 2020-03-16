import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeTemplateHelpersService } from './anyopsos-lib-node-template-helpers.service';

describe('AnyOpsOSLibNodeTemplateHelpersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeTemplateHelpersService = TestBed.get(AnyOpsOSLibNodeTemplateHelpersService);
    expect(service).toBeTruthy();
  });
});
