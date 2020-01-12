import {AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'altheia-theia',
  templateUrl: './anyopsos-ext-lib-theia.component.html',
  styleUrls: ['./anyopsos-ext-lib-theia.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnyOpsOSExtLibTheiaComponent implements AfterViewInit {
  @ViewChild('theia', {static: false}) theiaRef: ElementRef;

  ngAfterViewInit() {
    //this.runApplication(this.theiaRef.nativeElement);
  }

}
