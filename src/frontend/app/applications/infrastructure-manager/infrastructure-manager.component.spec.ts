import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureManagerComponent } from './infrastructure-manager.component';

describe('InfrastructureManagerComponent', () => {
  let component: InfrastructureManagerComponent;
  let fixture: ComponentFixture<InfrastructureManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfrastructureManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfrastructureManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
