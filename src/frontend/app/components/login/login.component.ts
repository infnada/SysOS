import {Component, OnInit} from '@angular/core';

import {UserStateService} from '../../services/user-state.service';
import {MainService} from '../../services/main.service';

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

  constructor(private UserState: UserStateService,
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

        console.log(res);
      },
      error => {
        console.error(error);
      });
  }

}
