import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SftpBodyNewConnectionComponent } from './sftp-body-new-connection.component';

describe('SftpBodyNewConnectionComponent', () => {
  let component: SftpBodyNewConnectionComponent;
  let fixture: ComponentFixture<SftpBodyNewConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SftpBodyNewConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SftpBodyNewConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
