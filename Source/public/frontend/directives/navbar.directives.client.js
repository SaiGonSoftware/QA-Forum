/**
 * Created by phuc.ngo on 12/20/2016.
 */
/*(function () {
    'use strict';
    angular
        .module('ChatBotApp')
        .directive('navbar', navbar);

    navbar.$inject = ['localStorageService'];
    function navbar(localStorageService) {
        return {
            restrict: 'E',
            templateUrl: '/layout/navbar.jade',
            scope: true,
            controller: function ($scope) {
                var loginUser = localStorageService.get('currentUser');
                if (loginUser) {
                    $scope.HideLoginSection = true;
                    $scope.IsLogin = true;
                }
                else {
                    $scope.HideLoginSection = false;
                    $scope.IsLogin = false;
                }
            }
        };
    }
})();*/