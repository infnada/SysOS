(function () {
  "use strict";
  myApp.run(['$templateCache', function ($templateCache) {

    $templateCache.put('templates/desktop/start_menu.html',
      '<div class="start-menu" ng-class="{\'start-menu--open\' : $root.taskbar__item_open == \'start\'}"> \
        <div class="start-menu__list"> \
          <div class="media"> \
            <a class="user-info menu-toggle"  ng-click="SM.openMenu(\'user\')"> \
              <img class="user-info__img media__img" src="/img/KkCqvK9.png" alt="User image"> \
              <div class="user-info__name media__body"> \
                User Name \
              </div> \
            </a> \
            <div class="menu" style="top: 60.5px; left: 0px;" ng-show="SM.openedMenu == \'user\'"> \
              <a >Change account picture</a> \
              <a >Lock</a> \
              <a >Sign out</a> \
            </div> \
            <a class="user-info__power menu-toggle"  ng-click="SM.openMenu(\'power\')"> \
              <i class="fa fa-power-off"></i> \
            </a> \
          </div> \
          <div class="menu" style="top: 60.5px; left: 188px;" ng-show="SM.openedMenu == \'power\'"> \
            <a >Sleep</a> \
            <a >Power off</a> \
            <a >Restart</a> \
          </div> \
          <ul class="start-menu__recent"> \
            <li ng-repeat="application in SM.applications" class="start-menu__{{::application.id}}" ng-click="SM.openApplication(application.id)" ng-if="application.id !== \'start\'" context-menu="SM.appContextMenu()"> \
              <a > \
              <i class="fa fa-{{::application.ico}}"></i> \
              {{::application.name}} \
              </a> \
            </li> \
          </ul> \
          <form class="search"> \
            <input type="text" class="search__input" placeholder="Search"> \
            <button class="search__btn"></button> \
          </form> \
        </div> \
        <div class="start-screen-scroll"> \
          <div class="start-screen"> \
          <a class="start-screen__tile start-screen__tile--explorer masonry-item" > \
            <i class="fa fa-folder"></i> \
            <span>File Explorer</span> \
          </a> \
          <a class="start-screen__tile masonry-item" > \
          </a> \
          <a class="start-screen__tile start-screen__tile--wide masonry-item"   data-ss-colspan="2"> \
          </a> \
          <div class="start-screen__smallgroup masonry-item"> \
            <a class="start-screen__tile start-screen__tile--small" ></a> \
            <a class="start-screen__tile start-screen__tile--small" ></a> \
            <a class="start-screen__tile start-screen__tile--small" ></a> \
          </div> \
          <a class="start-screen__tile masonry-item" > \
          </a> \
          <a class="start-screen__tile masonry-item" > \
          </a> \
          <a class="start-screen__tile start-screen__tile--notepad masonry-item" > \
          </a> \
          <a class="start-screen__tile start-screen__tile--large start-screen__tile--mail masonry-item"  data-ss-colspan="2"> \
            <i class="fa fa-envelope"></i> \
            <span>Mail</span> \
          </a> \
          <a class="start-screen__tile masonry-item" > \
          </a> \
          <a class="start-screen__tile masonry-item" > \
          </a> \
          <a class="start-screen__tile masonry-item" > \
          </a> \
          </div> \
        </div> \
		  </div>'
    );

  }]);
}());
