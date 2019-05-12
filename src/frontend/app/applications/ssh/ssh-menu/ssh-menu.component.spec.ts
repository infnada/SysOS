import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SshMenuComponent } from './ssh-menu.component';

describe('SshMenuComponent', () => {
  let component: SshMenuComponent;
  let fixture: ComponentFixture<SshMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SshMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SshMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
