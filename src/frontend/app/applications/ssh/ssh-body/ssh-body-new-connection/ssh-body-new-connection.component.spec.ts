import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SshBodyNewConnectionComponent } from './ssh-body-new-connection.component';

describe('SshBodyNewConnectionComponent', () => {
  let component: SshBodyNewConnectionComponent;
  let fixture: ComponentFixture<SshBodyNewConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SshBodyNewConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SshBodyNewConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
