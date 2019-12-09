import {Component, Input, OnInit} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smjt-anyopsos-modal-default-json-textarea',
  templateUrl: './anyopsos-modal-default-json-textarea.component.html',
  styleUrls: ['./anyopsos-modal-default-json-textarea.component.scss']
})
export class AnyOpsOSModalDefaultJsonTextareaComponent implements OnInit {
  @Input() title: string;
  @Input() data: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

}
