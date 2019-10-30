import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SysosLibUtilsService {

  constructor() {
  }

  scrollTo(elementId: string, toBottom: boolean = false): void {
    document.getElementById(elementId).scrollTo({
      top: (toBottom ? document.getElementById(elementId).scrollHeight : 0 ),
      behavior: 'smooth'
    });
  }
}
