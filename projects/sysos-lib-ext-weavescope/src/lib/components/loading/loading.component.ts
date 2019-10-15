import {Component, Input, OnInit} from '@angular/core';
import {sample} from 'lodash-es';

@Component({
  selector: 'slews-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() itemType: string;

  private template: string;
  private LOADING_TEMPLATES = [
    'Loading THINGS',
    'Verifying THINGS',
    'Fetching THINGS',
    'Processing THINGS',
    'Reticulating THINGS',
    'Locating THINGS',
    'Optimizing THINGS',
    'Transporting THINGS',
  ];

  message: string;

  constructor() {
  }

  ngOnInit() {
    this.template = sample(this.LOADING_TEMPLATES);
    this.message = this.renderTemplate(this.itemType, this.template);
  }

  private renderTemplate(nodeType: string, template: string): string {
    return template.replace('THINGS', nodeType);
  }

}
