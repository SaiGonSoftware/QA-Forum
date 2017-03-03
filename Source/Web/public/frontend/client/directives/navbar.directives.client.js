/**
 * Created by phuc.ngo on 12/20/2016.
 */

(function () {
    'use strict';
    angular
        .module('ChatBotApp')
        .directive('navbar', navbar);

    navbar.$inject = ['localStorageService', '$rootScope'];
    function navbar(localStorageService, $rootScope) {
        return {
            restrict: 'E',
            templateUrl: '/directives/navbar.html',
            scope: false,
            controller: function ($scope) {
                var loginUser = localStorageService.cookie.get('currentUser');
                var facebookUser = localStorageService.cookie.get('facebookUser');
                if (loginUser && !facebookUser) {
                    $rootScope.loginUser = loginUser;
                    $rootScope.HideLoginSection = true;
                    $rootScope.IsLogin = true;
                    $rootScope.IsFacebookLogin = false;
                }
                if (facebookUser && !loginUser) {
                    $rootScope.facebookUser = facebookUser;
                    $rootScope.HideLoginSection = true;
                    $rootScope.IsFacebookLogin = true;
                    $rootScope.IsLogin = false;
                }
                if (!loginUser && !facebookUser) {
                    $rootScope.HideLoginSection = false;
                    $rootScope.IsLogin = false;
                    $rootScope.IsFacebookLogin = false;
                }
                $scope.LogOut = function () {
                    localStorageService.cookie.remove('currentUser');
                    location.reload();
                };

                $scope.FacebookLogOut = function () {
                    localStorageService.cookie.remove('facebookUser');
                    location.reload();
                };
            }
        };
    }
})();

