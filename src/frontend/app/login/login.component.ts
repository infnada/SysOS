import {Component} from '@angular/core';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibUserService} from '@anyopsos/lib-user';

import {MainService} from '../services/main.service';

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

  constructor(private logger: AnyOpsOSLibLoggerService,
              private UserState: AnyOpsOSLibUserService,
              private Main: MainService) {
  }

  login(username: string, password: string): void {
    this.UserState.loginUser(username, password).subscribe(
      (res: { status: string, data?: any }) => {
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

}
