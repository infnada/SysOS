import { TestBed } from '@angular/core/testing';

import { NetappService } from './netapp.service';

describe('NetappService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetappService = TestBed.get(NetappService);
    expect(service).toBeTruthy();
  });
});
