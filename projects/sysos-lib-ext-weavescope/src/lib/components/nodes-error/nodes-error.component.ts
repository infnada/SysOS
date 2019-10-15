import {Component, Input} from '@angular/core';

@Component({
  selector: 'slews-nodes-error',
  templateUrl: './nodes-error.component.html',
  styleUrls: ['./nodes-error.component.scss']
})
export class NodesErrorComponent {
  @Input() mainClassName: string = 'nodes-chart-error';
  @Input() faIconClass: string;

  constructor() {
  }

}
