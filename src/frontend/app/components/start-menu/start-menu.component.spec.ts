import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartMenuComponent } from './start-menu.component';

describe('StartMenuComponent', () => {
  let component: StartMenuComponent;
  let fixture: ComponentFixture<StartMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
