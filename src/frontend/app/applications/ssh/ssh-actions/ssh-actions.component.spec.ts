import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SshActionsComponent } from './ssh-actions.component';

describe('SshActionsComponent', () => {
  let component: SshActionsComponent;
  let fixture: ComponentFixture<SshActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SshActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SshActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
