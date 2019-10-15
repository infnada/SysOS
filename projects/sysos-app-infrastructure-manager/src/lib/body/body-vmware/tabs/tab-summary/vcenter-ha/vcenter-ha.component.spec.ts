import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VcenterHaComponent } from './vcenter-ha.component';

describe('VcenterHaComponent', () => {
  let component: VcenterHaComponent;
  let fixture: ComponentFixture<VcenterHaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VcenterHaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VcenterHaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
