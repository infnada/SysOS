import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSummaryComponent } from './tab-summary.component';

describe('TabSummaryComponent', () => {
  let component: TabSummaryComponent;
  let fixture: ComponentFixture<TabSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
