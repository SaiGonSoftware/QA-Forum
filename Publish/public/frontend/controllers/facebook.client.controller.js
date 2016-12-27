/**
 * Created by ngohungphuc on 14/12/2016.
 */
/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-06 22:10:19
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-19 22:37:18
 */
(function () {
    'use strict';

    angular.module('ChatBotApp')
        .controller('FacebookController', FacebookController);
    FacebookController.$inject = ['$scope', 'localStorageService', '$rootScope', '$location'];

    function FacebookController($scope, localStorageService, $rootScope, $location) {
        $rootScope.IsFacebookLogin = false;
        $scope.facebookLogin = function () {
            refresh();
            $rootScope.IsFacebookLogin = true;
            $rootScope.HideLoginSection = true;
            $rootScope.IsLogin = false;
            window.location.reload();
        };

        function refresh() {
            FB.login(function (response) {
                if (response.authResponse) {
                    FB.api('/me', function (response) {
                        localStorageService.cookie.set('facebookUser', response.name, 1);
                        $rootScope.facebookUser = response.name;
                    });
                }
            });
        }
    }
})();