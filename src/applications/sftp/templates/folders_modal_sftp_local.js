(function () {
    'use strict';
    sftpApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/folders-modal-sftp-local.html',
            '<div class="folders-modal" ng-if="sftpBL.showModal" ng-switch="sftpBL.modalType"> \
              <h3>{{sftpBL.modalType}}</h3> \
              <input ng-switch-when="Download from url" type="text" class="form-control" set-focus ng-model="sftpBL.fileUrl" placeholder="Enter url" ng-keydown="sftpBL.handleKeyPress($event)"> \
              <input ng-switch-when="Rename" type="text" class="form-control" set-focus ng-model="sftpBL.modalInputName" placeholder="Enter new name" ng-keydown="sftpBL.handleKeyPress($event)"> \
              <input ng-switch-when="Create Folder" type="text" class="form-control" set-focus ng-model="sftpBL.modalInputName" placeholder="Enter folder Name" ng-keydown="sftpBL.handleKeyPress($event)"> \
              <div ng-switch-when="Delete File"> \
                <span>Delete confirmation for file {{sftpBL.modalInputName}}</span><br /> \
                <button type="button" class="btn btn-primary" set-focus ng-keydown="sftpBL.handleKeyPress($event)" ng-click="sftpBL.deleteSelected()">Delete</button> \
                <button type="button" class="btn" ng-click="sftpBL.showModal = !sftpBL.showModal; sftpBL.resetActive()">Cancel</button> \
              </div> \
            </div>'
        );

    }]);
}());