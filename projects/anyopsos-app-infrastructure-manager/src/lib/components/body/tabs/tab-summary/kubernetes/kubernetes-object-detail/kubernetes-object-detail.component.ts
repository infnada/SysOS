import {Component, Input, OnInit} from '@angular/core';

import {ImDataObject} from '../../../../../../types/im-data-object';

@Component({
  selector: 'saim-kubernetes-object-detail',
  templateUrl: './kubernetes-object-detail.component.html',
  styleUrls: ['./kubernetes-object-detail.component.scss']
})
export class KubernetesObjectDetailComponent implements OnInit {
  @Input() nmObject: ImDataObject;

  constructor() {
  }

  ngOnInit() {
  }

}
