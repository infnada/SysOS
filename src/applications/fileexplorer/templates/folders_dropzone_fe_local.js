(function () {
    'use strict';
    fileexplorerApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/folders-dropzone-fe-local.html',
            '<div class="dropzone" ngf-drop ngf-select \
            ng-model="feB.uploadFiles" \
            ngf-model-options="{debounce:100}" \
            ngf-multiple="true" \
            ngf-drag-over-class="{dragover}" \
            ngf-allow-dir="true"  \
            ngf-drop-available="true"> \
              Drop files here (from local system) or click to upload. \
            </div>'
        );

    }]);
}());