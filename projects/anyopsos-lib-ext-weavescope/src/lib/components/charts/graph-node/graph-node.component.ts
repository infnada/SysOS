import {Component, ElementRef, Input} from '@angular/core';
// import {Motion} from 'react-motion';

@Component({
  selector: '[slews-graph-node]',
  templateUrl: './graph-node.component.html',
  styleUrls: ['./graph-node.component.scss']
})
export class GraphNodeComponent {
  @Input() color: string = 'hsl(240, 20%, 60%)';
  @Input() contrastMode: boolean = false;
  @Input() cursorType: string = 'pointer';
  @Input() forceSvg: boolean = false;
  @Input() highlighted: boolean = false;
  @Input() id: string;
  @Input() isAnimated: boolean = false;
  @Input() label: string;
  @Input() labelMinor: string = '';
  @Input() labelOffset: number = 0;
  @Input() networks;
  @Input() matches;
  @Input() metricColor: string = 'hsl(46, 69%, 49%)';
  @Input() metricFormattedValue: string = '';
  @Input() metricNumericValue: number = NaN;
  @Input() searchTerms: string[] = [];
  @Input() shape: 'circle' | 'cloud' | 'cylinder' | 'dottedcylinde' | 'ShapeDottedTriangle' | 'heptagon' | 'hexagon' | 'octago' | 'pentagon' | 'sheet' | 'square' | 'triangle';
  @Input() size: number = 55;
  @Input() stacked: boolean = false;
  @Input() tag: 'camera' | 'none' = 'none';
  @Input() x: number = 0;
  @Input() y: number = 0;

  public parentRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.parentRef = elementRef;
  }

  weakSpring(value) {
    return { damping: 18, precision: 1, stiffness: 100, value };
  }

}
