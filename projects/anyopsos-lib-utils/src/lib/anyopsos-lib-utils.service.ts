import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibUtilsService {

  constructor() {
  }

  scrollTo(elementId: string, toBottom: boolean = false): void {
    document.getElementById(elementId).scrollTo({
      top: (toBottom ? document.getElementById(elementId).scrollHeight : 0 ),
      behavior: 'smooth'
    });
  }
}
