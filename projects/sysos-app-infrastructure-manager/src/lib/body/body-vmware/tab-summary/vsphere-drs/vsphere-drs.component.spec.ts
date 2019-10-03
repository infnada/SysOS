import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VsphereDrsComponent } from './vsphere-drs.component';

describe('VsphereDrsComponent', () => {
  let component: VsphereDrsComponent;
  let fixture: ComponentFixture<VsphereDrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VsphereDrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VsphereDrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
