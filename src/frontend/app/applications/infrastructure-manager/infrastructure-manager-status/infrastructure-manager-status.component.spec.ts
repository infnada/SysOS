import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureManagerStatusComponent } from './infrastructure-manager-status.component';

describe('InfrastructureManagerStatusComponent', () => {
  let component: InfrastructureManagerStatusComponent;
  let fixture: ComponentFixture<InfrastructureManagerStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfrastructureManagerStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfrastructureManagerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
