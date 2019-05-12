import {Component, OnInit} from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import {UserStateService} from "./services/user-state.service";
import {MainService} from "./services/main.service";
import {ApplicationsService} from "./services/applications.service";

import {Application} from "./interfaces/application";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  openedApplications: Application[];
  userLoggedIn: boolean;

  constructor(private cookieService: CookieService,
              private MainService: MainService,
              private UserStateService: UserStateService,
              private ApplicationsService: ApplicationsService) {
  }

  ngOnInit() {
    this.ApplicationsService.openedApplications.subscribe(applications => this.openedApplications = applications);
    this.UserStateService.currentState.subscribe(state => this.userLoggedIn = state.userLoggedIn);

    if (this.cookieService.check('uniqueId')) {

      this.UserStateService.getSession().subscribe(
        (res: { status: string }) => {
          if (res.status === 'ok') {
            this.UserStateService.setState({
              userLoggedIn: true,
              username: "root"
            });

            return this.MainService.init();
          }

          if (res.status === 'error') {
            console.debug('SysOS -> Removing uniqueId cookie');
            return this.cookieService.delete('uniqueId')
          }

          console.log(res);
        },
        error => {
          console.error(error);
        });

    }
  }

}
