import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsManagerComponent } from './credentials-manager.component';

describe('CredentialsManagerComponent', () => {
  let component: CredentialsManagerComponent;
  let fixture: ComponentFixture<CredentialsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
