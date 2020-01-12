import {Component} from '@angular/core';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibUserService} from '@anyopsos/lib-user';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

import {MainService} from '../../services/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = 'root';
  password: string;
  capsOn: boolean = false;
  invalidLogin: boolean = false;

  loginExpanded: boolean = false;

  date: string;
  time: string;

  constructor(private logger: AnyOpsOSLibLoggerService,
              private UserState: AnyOpsOSLibUserService,
              private Main: MainService) {

    setInterval(() => {
      this.date = new Date().toLocaleDateString("en-US", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      this.time = new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});
    }, 1000);
  }

  login(username: string, password: string): void {
    this.UserState.loginUser(username, password).subscribe(
      (res: BackendResponse) => {
        if (res.status === 'ok') {
          this.UserState.setState({
            userLoggedIn: true,
            username: 'root'
          });

          return this.Main.init();
        }

        if (res.status === 'error') {
          this.invalidLogin = res.data;
          this.logger.error('Login', 'Error while login user', null, res.data);
        }
      },
      error => {
        this.logger.error('Login', 'Error while login user', null, error);
      });
  }

  getDate() {
    return this.date;
  }

  getTime() {
    return this.time;
  }

}
