(function () {
    'use strict';
    sftpApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/folders-modal-sftp-server.html',
            '<div class="folders-modal" ng-if="sftpBS.showModal" ng-switch="sftpBS.modalType"> \
              <h3>{{sftpBS.modalType}}</h3> \
              <input ng-switch-when="Download from url" type="text" class="form-control" set-focus ng-model="sftpBS.fileUrl" placeholder="Enter url" ng-keydown="sftpBS.handleKeyPress($event)"> \
              <input ng-switch-when="Rename" type="text" class="form-control" set-focus ng-model="sftpBS.modalInputName" placeholder="Enter new name" ng-keydown="sftpBS.handleKeyPress($event)"> \
              <input ng-switch-when="Create Folder" type="text" class="form-control" set-focus ng-model="sftpBS.modalInputName" placeholder="Enter folder Name" ng-keydown="sftpBS.handleKeyPress($event)"> \
              <div ng-switch-when="Delete File"> \
                <span>Delete confirmation for file {{sftpBS.modalInputName}}</span><br /> \
                <button type="button" class="btn btn-primary" set-focus ng-keydown="sftpBS.handleKeyPress($event)" ng-click="sftpBS.deleteSelected()">Delete</button> \
                <button type="button" class="btn" ng-click="sftpBS.showModal = !sftpBS.showModal; sftpBS.resetActive()">Cancel</button> \
              </div> \
            </div>'
        );

    }]);
}());