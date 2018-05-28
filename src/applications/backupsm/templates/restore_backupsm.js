(function () {
    'use strict';
    backupsmApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/restore-backupsm.html',
            '{{bmB.getActiveRestore().type}} \
            <div ng-if="bmB.getActiveRestore().type == \'mount_restore_datastore\'"> \
                <div ng-if ="bmB.getActiveRestore().status == 2"> \
                    <button class="btn btn-primary" type="button" ng-click="bmB.unpublishRestoredDatastore()">Stop Publishing Datastore</button> \
                    <button class="btn btn-primary" type="button" ng-click="bmB.openDatastoreBrowser()">Open Datastore Browser</button> \
                </div> \
                Restore status: {{bmB.getActiveRestore().status}} \
            </div> \
            <div ng-if="bmB.getActiveRestore().type == \'restore_datastore_files\'"> \
                <div ng-if ="bmB.getActiveRestore().status == 2"> \
                    <button class="btn btn-primary" type="button" ng-click="bmB.unpublishRestoredDatastore()">Stop Publishing Datastore</button> \
                    <button class="btn btn-primary" type="button" ng-click="bmB.openDatastoreBrowser()">Open Datastore Browser</button> \
                </div> \
                Restore status: {{bmB.getActiveRestore().status}} \
            </div> \
            <div ng-if="bmB.getActiveRestore().type == \'restore_vm_guest_files\'"> \
                Restore status: {{bmB.getActiveRestore().status}} \
            </div> \
            <div ng-if="bmB.getActiveRestore().type == \'vm_instant_recovery\'"> \
                <div ng-if ="bmB.getActiveRestore().status == 2"> \
                    <button class="btn btn-primary" type="button" ng-click="bmB.unpublishRestoredInstantVM()">Stop Publishing Instant VM</button> \
                    <button class="btn btn-primary" type="button" ng-click="bmB.migrateInstantVMtoProduction()">Migrate Instant VM to Production</button> \
                </div> \
                Restore status: {{bmB.getActiveRestore().status}} \
            </div>'
        );

    }]);
}());
