import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SshBodyComponent } from './ssh-body.component';

describe('SshBodyComponent', () => {
  let component: SshBodyComponent;
  let fixture: ComponentFixture<SshBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SshBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SshBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
