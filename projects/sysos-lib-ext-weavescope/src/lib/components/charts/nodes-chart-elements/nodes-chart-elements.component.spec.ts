import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodesChartElementsComponent } from './nodes-chart-elements.component';

describe('NodesChartElementsComponent', () => {
  let component: NodesChartElementsComponent;
  let fixture: ComponentFixture<NodesChartElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodesChartElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodesChartElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
