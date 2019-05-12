import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SshStatusComponent } from './ssh-status.component';

describe('SshStatusComponent', () => {
  let component: SshStatusComponent;
  let fixture: ComponentFixture<SshStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SshStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SshStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
