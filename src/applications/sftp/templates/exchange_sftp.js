(function () {
	"use strict";
	sftpApp.run(['$templateCache', function ($templateCache) {

		$templateCache.put('templates/applications/exchange-sftp.html',
			'<table class="table table-hover table-elipsis"> \
			  <thead> \
				<tr> \
				  <th>#</th> \
				  <th>Exchange</th> \
				  <th>Source</th> \
				  <th>Destination</th> \
				  <th>Size</th> \
				  <th>Status</th> \
				  <th>Actions</th> \
				</tr> \
			  </thead> \
			  <tbody> \
				<tr ng-if="!sftpB.uploadFiles"><td colspan="7" class="center">No recent transactions.</td></tr> \
				<tr ng-repeat="f in sftpB.uploadFiles"> \
				  <td>{{::$index + 1}}</td> \
				  <td ng-if="!f.exchange">Local to SysOS</td> \
				  <td ng-if="f.exchange == \'upload\'">SysOS to Server</td> \
				  <td ng-if="f.exchange == \'download\'">Server to SysOS</td> \
				  <td ng-if="!f.source" title="Local device">Local device</td> \
				  <td ng-if="f.source" title="{{::f.source}}">{{::f.source}}</td> \
				  <td ng-if="f.path" title="/{{::f.path}}">/{{::f.path}}</td> \
				  <td ng-if="!f.path" title="/{{::f.name}}">/{{::f.name}}</td> \
				  <td>{{::f.size}}</td> \
				  <td> \
					<span class="progress" ng-show="f.progress >= 0"> \
					  <div style="width:{{f.progress}}%">{{f.progress}}%</div> \
					</span> \
				  </td> \
				  <td class="text-navy"> \
					<button class="btn btn-xs" ng-click="f.upload.abort();f.upload.aborted=true" ng-show="f.upload != null && f.progress < 100 && !f.upload.aborted"> \
					  Abort<span ng-show="sftpB.isResumeSupported">/Pause</span> \
					</button> \
					<button class="btn btn-xs" ng-click="sftpB.uploadFile(f);f.upload.aborted=false" ng-show="sftpB.isResumeSupported && f.upload != null && f.upload.aborted">Resume</button> \
					<button class="btn btn-xs" ng-click="sftpB.restart(f);f.upload.aborted=false" ng-show="sftpB.isResumeSupported && f.upload != null && (f.progress == 100 || f.upload.aborted)">Restart</button> \
				  </td> \
				</tr> \
			  </tbody> \
			</table>'
		);

	}]);
}());