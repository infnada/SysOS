import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsManagerActionsComponent } from './credentials-manager-actions.component';

describe('CredentialsManagerActionsComponent', () => {
  let component: CredentialsManagerActionsComponent;
  let fixture: ComponentFixture<CredentialsManagerActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialsManagerActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialsManagerActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
