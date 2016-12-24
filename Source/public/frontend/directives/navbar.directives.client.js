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
                var facebookUser = localStorageService.cookie.get('facebookUser');
                var profileFbImg = localStorageService.cookie.get('profileImg');
                if (loginUser && !facebookUser) {
                    $scope.loginUser = loginUser;
                    $scope.HideLoginSection = true;
                    $scope.IsLogin = true;
                    $scope.isFacebookLogin = false;
                }
                if (facebookUser && !loginUser) {
                    $scope.profileFbImg = profileFbImg;
                    $scope.facebookUser = facebookUser;
                    $scope.HideLoginSection = true;
                    $scope.isFacebookLogin = true;
                    $scope.IsLogin = false;
                }
                if (!loginUser && !facebookUser) {
                    $scope.HideLoginSection = false;
                    $scope.IsLogin = false;
                    $scope.isFacebookLogin = false;
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

