import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodesChartComponent } from './nodes-chart.component';

describe('NodesChartComponent', () => {
  let component: NodesChartComponent;
  let fixture: ComponentFixture<NodesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
