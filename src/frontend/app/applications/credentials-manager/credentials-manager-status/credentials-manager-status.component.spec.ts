import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsManagerStatusComponent } from './credentials-manager-status.component';

describe('CredentialsManagerStatusComponent', () => {
  let component: CredentialsManagerStatusComponent;
  let fixture: ComponentFixture<CredentialsManagerStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialsManagerStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialsManagerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
