import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-plain',
  templateUrl: './plain.component.html',
  styleUrls: ['./plain.component.scss']
})
export class PlainComponent implements OnInit {
  @Input() title: string;
  @Input() text: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}
