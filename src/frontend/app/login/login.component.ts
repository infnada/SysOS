import {Component, OnInit} from '@angular/core';

import {SysosLibLoggerService} from '@sysos/lib-logger';

import {SysosLibUserService} from '@sysos/lib-user';

import {MainService} from '../services/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = 'root';
  password: string;
  capsOn: boolean = false;

  loginExpanded: boolean = false;

  constructor(private logger: SysosLibLoggerService,
              private UserState: SysosLibUserService,
              private Main: MainService) {
  }

  ngOnInit() {
  }

  login(username: string, password: string): void {
    this.UserState.loginUser(username, password).subscribe(
      (res: { status: string }) => {
        if (res.status === 'ok') {
          this.UserState.setState({
            userLoggedIn: true,
            username: 'root'
          });

          return this.Main.init();
        }
      },
      error => {
        this.logger.error('Login', 'Error while login user', null, error);
      });
  }

}
