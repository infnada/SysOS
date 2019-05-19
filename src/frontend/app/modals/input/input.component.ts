import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() title: string;
  @Input() text: string;
  @Input() button_text: string;
  @Input() inputValue: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}
