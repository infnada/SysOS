import {Component, OnInit} from '@angular/core';

import {UserStateService} from "../../services/user-state.service";
import {MainService} from "../../services/main.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginExpanded: boolean = false;

  constructor(private UserStateService: UserStateService,
              private MainService: MainService) {
  }

  ngOnInit() {
  }

  login(username: string, password: string): void {
    this.UserStateService.loginUser(username, password).subscribe(
      (res: { status: string }) => {
        if (res.status === 'ok') {
          this.UserStateService.setState({
            userLoggedIn: true,
            username: "root"
          });

          return this.MainService.init();
        }

        console.log(res);
      },
      error => {
        console.error(error);
      });
  }

}
