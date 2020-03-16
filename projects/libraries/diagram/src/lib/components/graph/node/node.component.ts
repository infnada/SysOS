import {ChangeDetectionStrategy, Component, ElementRef, Input} from '@angular/core';

// import {Motion} from 'react-motion';

import {LayoutNode} from '../../../types/layout-node';

@Component({
  selector: '[aldiagram-node]',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeComponent {
  @Input() nodeElement: LayoutNode;
  @Input() isAnimated: boolean;

  @Input() labelOffset: number = 0;
  @Input() color: string = 'hsl(240, 20%, 60%)';
  @Input() contrastMode: boolean = false;
  @Input() forceSvg: boolean = false;
  @Input() searchTerms: string[] = [];
  @Input() metricColor: string = 'hsl(46, 69%, 49%)';
  @Input() metricFormattedValue: string = '';
  @Input() metricNumericValue: number = NaN;

  parentRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.parentRef = elementRef;
  }

  weakSpring(value) {
    return { damping: 18, precision: 1, stiffness: 100, value };
  }

}
