import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalPlainComponent } from './sysos-modal-plain.component';

describe('SysosModalPlainComponent', () => {
  let component: SysosModalPlainComponent;
  let fixture: ComponentFixture<SysosModalPlainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalPlainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalPlainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
