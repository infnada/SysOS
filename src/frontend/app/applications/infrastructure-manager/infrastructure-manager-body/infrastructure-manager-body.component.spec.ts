import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureManagerBodyComponent } from './infrastructure-manager-body.component';

describe('InfrastructureManagerBodyComponent', () => {
  let component: InfrastructureManagerBodyComponent;
  let fixture: ComponentFixture<InfrastructureManagerBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfrastructureManagerBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfrastructureManagerBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
