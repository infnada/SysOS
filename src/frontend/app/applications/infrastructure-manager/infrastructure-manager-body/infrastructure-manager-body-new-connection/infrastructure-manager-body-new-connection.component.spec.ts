import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureManagerBodyNewConnectionComponent } from './infrastructure-manager-body-new-connection.component';

describe('InfrastructureManagerBodyNewConnectionComponent', () => {
  let component: InfrastructureManagerBodyNewConnectionComponent;
  let fixture: ComponentFixture<InfrastructureManagerBodyNewConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfrastructureManagerBodyNewConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfrastructureManagerBodyNewConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
