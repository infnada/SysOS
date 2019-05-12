import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureManagerMenuComponent } from './infrastructure-manager-menu.component';

describe('InfrastructureManagerMenuComponent', () => {
  let component: InfrastructureManagerMenuComponent;
  let fixture: ComponentFixture<InfrastructureManagerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfrastructureManagerMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfrastructureManagerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
