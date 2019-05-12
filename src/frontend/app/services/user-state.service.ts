import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private stateSource = new BehaviorSubject({
    userLoggedIn: false,
    username: "root"
  });
  currentState = this.stateSource.asObservable();

  constructor(private http: HttpClient) {
  }

  setState(data: any): void {
    this.stateSource.next(data)
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.post('/api/credential/login', {
      username: username,
      password: password
    });
  }

  getSession() {
    return this.http.get('/getSession');
  }
}
