import {mxPoint} from './mx-point';

export interface mxPerimeter {
  RectanglePerimeter(bounds: any, vertex: any, next: any, orthogonal: any): mxPoint;
  EllipsePerimeter(bounds: any, vertex: any, next: any, orthogonal: any): mxPoint;
  RhombusPerimeter(bounds: any, vertex: any, next: any, orthogonal: any): any;
  TrianglePerimeter(bounds: any, vertex: any, next: any, orthogonal: any): any;
  HexagonPerimeter(bounds: any, vertex: any, next: any, orthogonal: any): mxPoint;
}
