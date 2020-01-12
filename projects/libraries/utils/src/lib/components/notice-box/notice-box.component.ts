import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'alutil-notice-box',
  templateUrl: './notice-box.component.html',
  styleUrls: ['./notice-box.component.scss']
})
export class NoticeBoxComponent implements OnInit {
  @Input() content: string;
  @Input() icon: string;
  @Input() class: string;

  constructor() { }

  ngOnInit(): void {
  }

}
