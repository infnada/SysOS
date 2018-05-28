/*
 * Connect to socket.io and return socket object
 */

(function () {
    'use strict';
    SysOS.factory('modalFactory', ['$uibModal', '$document', function ($uibModal, $document) {
        var modalInstances = [];
        var registredModals = [];

        /*
         * @param data {object} {
         *      modalId:
         *      controller:
         *      controllerAs:
         *      templateUrl:
         *      size:
         *      resolve:
         * }
         */
        var registerModal = function (data) {
            registredModals[data.modalId] = data;
        };

        /*
         * Opens a registered modal
         */
        var openRegistredModal = function (modalId, query, resolve) {

            var appendTo = angular.element($document[0].querySelector(query));

            if (appendTo.length) {
                modalInstances[query] = $uibModal.open({
                    templateUrl: registredModals[modalId].templateUrl,
                    controller: registredModals[modalId].controller,
                    controllerAs: registredModals[modalId].controllerAs,
                    backdropClass: 'absolute',
                    windowClass: 'absolute',
	                backdrop: 'static',
                    size: registredModals[modalId].size,
                    appendTo: appendTo,
                    resolve: resolve
                });

                return modalInstances[query];
            }

        };

        /*
         * "alias" to open "plain" modalId
         */
        var openLittleModal = function (title, text, query, modalId) {

            return openRegistredModal(modalId, query, {
                title: function () {
                    return title;
                },
                text: function () {
                    return text;
                }
            });

        };

        /*
         * Change text of already created modal
         */
        var changeModalText = function (text, query) {

            var appendTo = angular.element($document[0].querySelector(query));

            //TODO: change pmC.text to dynamic controllerAs.text

            if (appendTo.length) {
                if (angular.element($document[0].querySelector(query + ' .modal')).length) angular.element($document[0].querySelector(query + ' .modal')).scope().pmC.text = text;
            }

        };

        /*
         * Close already created modal
         */
        var closeModal = function (query) {
            if (modalInstances[query]) modalInstances[query].close('ok');
        };

        /*
         * Register basic modals
         */
        registerModal({
            modalId: 'plain',
            templateUrl: 'templates/utils/modal.html',
            size: 'sm',
            controllerAs: 'pmC',
            controller: ['title', 'text', '$uibModalInstance', function (title, text, $uibModalInstance) {
                this.title = title;
                this.text = text;

	            this.close = function () {
		            $uibModalInstance.close("close");
	            };
            }]
        });

        registerModal({
            modalId: 'question',
            templateUrl: 'templates/utils/question.html',
            size: 'sm',
            controllerAs: 'qmC',
            controller: ['title', 'text', '$uibModalInstance', function (title, text, $uibModalInstance) {
                this.title = title;
                this.text = text;

                this.yes = function () {
                    $uibModalInstance.close(true);
                };

                this.no = function () {
                    $uibModalInstance.close(false);
                };

	            this.close = function () {
		            $uibModalInstance.close("close");
	            };
            }]
        });

        registerModal({
            modalId: 'input',
            templateUrl: 'templates/utils/input.html',
            size: 'sm',
            controllerAs: 'imC',
            controller: ['title', 'text', 'button_text', 'inputValue', '$uibModalInstance', function (title, text, button_text, inputValue, $uibModalInstance) {
                var _this = this;
                this.title = title;
                this.text = text;
                this.button_text = button_text;
                this.inputValue = inputValue;

                this.yes = function () {
                    $uibModalInstance.close(_this.inputValue);
                };

                this.no = function () {
                    $uibModalInstance.close(false);
                };

	            this.close = function () {
		            $uibModalInstance.close("close");
	            };
            }]
        });

        return {
            registerModal: registerModal,
            openLittleModal: openLittleModal,
            openRegistredModal: openRegistredModal,
            changeModalText: changeModalText,
            closeModal: closeModal
        };

    }]);

}());
