import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SftpStatusComponent } from './sftp-status.component';

describe('SftpStatusComponent', () => {
  let component: SftpStatusComponent;
  let fixture: ComponentFixture<SftpStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SftpStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SftpStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
