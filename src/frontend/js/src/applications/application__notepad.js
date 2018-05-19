(function () {
  "use strict";
	myApp.run(['$templateCache', function($templateCache) {

	  $templateCache.put('templates/applications/menu-notepad.html',
		  '<li> \
        <a > \
          <i class="menu__icon fa fa-download"></i> \
          Save \
        </a> \
      </li> \
      <li> \
        <a > \
          <i class="menu__icon fa fa-folder-open"></i> \
          Open \
        </a> \
      </li> \
      <li> \
        <a > \
          <i class="menu__icon fa fa-print"></i> \
          Print \
        </a> \
      </li> \
      <li> \
        <a > \
          <i class="menu__icon fa fa-share-alt"></i> \
          Share \
        </a> \
      </li> \
      <li class="divided"> \
        <a > \
          <i class="menu__icon fa fa-file"></i> \
          Format \
        </a> \
      </li> \
      <li> \
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

    $templateCache.put('templates/applications/body-notepad.html',
      '<div class="window__body" ng-controller="notepadBodyController as nB"> \
        <div class="window__main no_padding"> \
          <textarea class="full-textarea" ui-codemirror="{ onLoad : nB.codemirrorLoaded }" ui-codemirror-opts="nB.editorOptions" ng-model="nB.editorData"></textarea> \
        </div> \
      </div>'
    );

  }]);
}());

(function () {
  "use strict";
  myApp.controller('notepadBodyController', ['$scope', function ($scope) {

    var _this = this;
    this.editorData = "test";

    this.editorOptions = {
      lineWrapping : true,
      lineNumbers: true,
      mode: 'shell',
      matchBrackets: true,
      viewportMargin: Infinity,
      autofocus: true
    };

    this.codemirrorLoaded = function(_editor){
      // Editor part
      var _doc = _editor.getDoc();
      _editor.focus();
    };

    $scope.$on('notepad__new_data', function (event, data) {
      console.log("newdata");
      _this.editorData = data;
    });

  }]);
}());

(function () {
  "use strict";
  myApp.run(['ApplicationsFactory', function(ApplicationsFactory) {

    ApplicationsFactory.registerApplication({id: "notepad", ico: "pencil", name: "Notepad", menu: true, style: "width:600px;height:300px;top:10%;left:30%;"});

  }]);
}());
