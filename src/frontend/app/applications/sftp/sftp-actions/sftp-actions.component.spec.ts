import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SftpActionsComponent } from './sftp-actions.component';

describe('SftpActionsComponent', () => {
  let component: SftpActionsComponent;
  let fixture: ComponentFixture<SftpActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SftpActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SftpActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
