import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartMenuItemsComponent } from './start-menu-items.component';

describe('StartMenuItemsComponent', () => {
  let component: StartMenuItemsComponent;
  let fixture: ComponentFixture<StartMenuItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartMenuItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
