import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInputComponent } from './sysos-modal-input.component';

describe('SysosModalInputComponent', () => {
  let component: SysosModalInputComponent;
  let fixture: ComponentFixture<SysosModalInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
