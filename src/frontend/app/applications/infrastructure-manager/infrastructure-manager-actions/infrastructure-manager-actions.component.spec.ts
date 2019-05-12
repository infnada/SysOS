import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureManagerActionsComponent } from './infrastructure-manager-actions.component';

describe('InfrastructureManagerActionsComponent', () => {
  let component: InfrastructureManagerActionsComponent;
  let fixture: ComponentFixture<InfrastructureManagerActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfrastructureManagerActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfrastructureManagerActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
