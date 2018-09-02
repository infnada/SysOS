(function () {
    'use strict';
    backupsmApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/restore-backupsm.html',
            '{{bmB.getActive().type}} \
            Restore status: \
            <p ng-repeat="state in status">{{state}}</p> \
            <div ng-if="bmB.getActive().type == \'mount_restore_datastore\'"> \
                <div ng-if ="bmB.getActive().status[bmB.getActive().status.length - 1] == \'end\'"> \
                    <button class="btn btn-primary" type="button" ng-click="bmB.unpublishRestoredDatastore()">Stop Publishing Datastore</button> \
                    <button class="btn btn-primary" type="button" ng-click="bmB.openDatastoreBrowser()">Open Datastore Browser</button> \
                </div> \
                Restore status: {{bmB.getActive().status}} \
            </div> \
            <div ng-if="bmB.getActive().type == \'restore_datastore_files\'"> \
                <div ng-if ="bmB.getActive().status[bmB.getActive().status.length - 1] == \'end\'"> \
                    <button class="btn btn-primary" type="button" ng-click="bmB.unpublishRestoredDatastore()">Stop Publishing Datastore</button> \
                    <button class="btn btn-primary" type="button" ng-click="bmB.openDatastoreBrowser()">Open Datastore Browser</button> \
                </div> \
                Restore status: {{bmB.getActive().status}} \
            </div> \
            <div ng-if="bmB.getActive().type == \'restore_vm_guest_files\'"> \
                Restore status: {{bmB.getActive().status}} \
            </div> \
            <div ng-if="bmB.getActive().type == \'vm_instant_recovery\'"> \
                <div ng-if ="bmB.getActive().status[bmB.getActive().status.length - 1] == \'end\'"> \
                    <button class="btn btn-primary" type="button" ng-click="bmB.unpublishRestoredInstantVM()">Stop Publishing Instant VM</button> \
                    <button class="btn btn-primary" type="button" ng-click="bmB.migrateInstantVMtoProduction()">Migrate Instant VM to Production</button> \
                </div> \
                Restore status: {{bmB.getActive().status}} \
            </div>'
        );

    }]);
}());
