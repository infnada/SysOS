import {Component, Input, Output} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {InputComponent} from "../input.component";

@Component({
  template: ''
})
export class InputEntryComponent {
  @Input() size: "sm"|"lg";
  @Input() selector: string;
  @Output() OutputNgbModalRef: NgbModalRef;

  constructor(private NgbModal: NgbModal) {
    setTimeout(() => {
      this.launchModal();
    }, 0);
  }

  launchModal(): void {
    this.OutputNgbModalRef = this.NgbModal.open(
      InputComponent,
      {
        centered: true,
        backdrop: 'static',
        backdropClass: 'absolute',
        windowClass: 'absolute',
        size: this.size,
        container: this.selector
      }
    );
  }

}
