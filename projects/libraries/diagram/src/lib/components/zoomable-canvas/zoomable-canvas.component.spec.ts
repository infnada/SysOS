import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomableCanvasComponent } from './zoomable-canvas.component';

describe('ZoomableCanvasComponent', () => {
  let component: ZoomableCanvasComponent;
  let fixture: ComponentFixture<ZoomableCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomableCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomableCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
