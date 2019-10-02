import { TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerNewAlarmDefinitionService } from './sysos-modal-infrastructure-manager-new-alarm-definition.service';

describe('SysosModalInfrastructureManagerNewAlarmDefinitionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosModalInfrastructureManagerNewAlarmDefinitionService = TestBed.get(SysosModalInfrastructureManagerNewAlarmDefinitionService);
    expect(service).toBeTruthy();
  });
});
