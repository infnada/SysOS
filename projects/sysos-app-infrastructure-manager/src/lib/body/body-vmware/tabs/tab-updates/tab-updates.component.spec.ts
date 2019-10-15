import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabUpdatesComponent } from './tab-updates.component';

describe('TabUpdatesComponent', () => {
  let component: TabUpdatesComponent;
  let fixture: ComponentFixture<TabUpdatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabUpdatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
