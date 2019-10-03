import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VappStatusComponent } from './vapp-status.component';

describe('VappStatusComponent', () => {
  let component: VappStatusComponent;
  let fixture: ComponentFixture<VappStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VappStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VappStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
