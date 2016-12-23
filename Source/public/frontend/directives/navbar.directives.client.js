/**
 * Created by phuc.ngo on 12/20/2016.
 */

(function () {
    'use strict';
    angular
        .module('ChatBotApp')
        .directive('navbar', navbar);

    navbar.$inject = ['localStorageService'];
    function navbar(localStorageService) {
        return {
            restrict: 'E',
            templateUrl: '/directives/navbar.html',
            scope: false,
            controller: function ($scope) {
                var loginUser = localStorageService.cookie.get('currentUser');
                if (loginUser) {
                    $scope.loginUser = loginUser;
                    $scope.HideLoginSection = true;
                    $scope.IsLogin = true;
                }
                else {
                    $scope.HideLoginSection = false;
                    $scope.IsLogin = false;
                }

                $scope.LogOut = function () {
                    localStorageService.cookie.remove('currentUser');
                    location.reload();
                };
            }
        };
    }
})();

