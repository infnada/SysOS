import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerAddTagComponent } from './sysos-modal-infrastructure-manager-add-tag.component';

describe('SysosModalInfrastructureManagerAddTagComponent', () => {
  let component: SysosModalInfrastructureManagerAddTagComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerAddTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerAddTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerAddTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
