import { TestBed } from '@angular/core/testing';

import { TopologyUtilsService } from './topology-utils.service';

describe('TopologyUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopologyUtilsService = TestBed.get(TopologyUtilsService);
    expect(service).toBeTruthy();
  });
});
