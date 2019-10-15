import { TestBed } from '@angular/core/testing';

import { NodeDetailsUtilsService } from './node-details-utils.service';

describe('NodeDetailsUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NodeDetailsUtilsService = TestBed.get(NodeDetailsUtilsService);
    expect(service).toBeTruthy();
  });
});
