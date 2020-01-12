import {ElementRef, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibUtilsService {

  constructor() {
  }

  scrollTo(elementId: string, toBottom: boolean = false): void {
    document.getElementById(elementId).scrollTo({
      top: (toBottom ? document.getElementById(elementId).scrollHeight : 0),
      behavior: 'smooth'
    });
  }

  angularElementScrollTo(element: HTMLElement, toBottom: boolean = false): void {
    element.scrollTo({
      top: (toBottom ? element.scrollHeight : 0),
      behavior: 'smooth'
    });
  }
}
