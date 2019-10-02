import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryStatsComponent } from './summary-stats.component';

describe('SummaryStatsComponent', () => {
  let component: SummaryStatsComponent;
  let fixture: ComponentFixture<SummaryStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
