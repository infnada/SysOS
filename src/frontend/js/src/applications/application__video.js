(function () {
  "use strict";
	myApp.run(['$templateCache', function($templateCache) {

	  $templateCache.put('templates/applications/menu-video.html',
		  '<li> \
        <a > \
          <i class="menu__icon fa fa-search"></i> \
          Search \
        </a> \
      </li> \
      <li> \
        <a > \
          <i class="menu__icon fa fa-share-alt"></i> \
          Share \
        </a> \
      </li> \
      <li> \
        <a > \
          <i class="menu__icon fa fa-plug"></i> \
          Devices \
        </a> \
      </li> \
      <li class="divided"> \
        <a > \
          <i class="menu__icon fa fa-cog"></i> \
          Settings \
        </a> \
      </li>'
	  );

	}]);
}());

(function () {
  "use strict";
  myApp.run(['$templateCache', function($templateCache) {

    $templateCache.put('templates/applications/body-video.html',
      '<div class="window__body"> \
        <div class="window__main no_padding"> \
          <video class="full_video" src="http://localhost:9001/video" controls></video> \
        </div> \
      </div>'
    );

  }]);
}());

(function () {
  "use strict";
  myApp.run(['ApplicationsFactory', function(ApplicationsFactory) {

    ApplicationsFactory.registerApplication({id: "video", ico: "play", name: "Video Player", menu: true, style: "width:1270px;height:600px;top:9%;left:10%;"});

  }]);
}());
