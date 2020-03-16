import {Component, Input, OnInit} from '@angular/core';

import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

@Component({
  selector: 'aaim-kubernetes-object-detail',
  templateUrl: './kubernetes-object-detail.component.html',
  styleUrls: ['./kubernetes-object-detail.component.scss']
})
export class KubernetesObjectDetailComponent implements OnInit {
  @Input() nmObject: DataObject;

  constructor() {
  }

  ngOnInit(): void {
  }

}
