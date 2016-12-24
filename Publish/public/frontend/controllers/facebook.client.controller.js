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
    FacebookController.$inject = ['$scope', 'localStorageService'];

    function FacebookController($scope, localStorageService) {
        $scope.IsFacebookLogin = false;
        $scope.facebookLogin = function () {
            FB.login(function (response) {
                if (response.authResponse) {
                    FB.api('/me', function (response) {
                        $scope.IsFacebookLogin = true;
                        $scope.welcomeMsg = 'Xin chào ' + response.name;
                        FB.api(response.id + '/picture', function (response) {
                            localStorageService.cookie.set('profileImg', response.data.url, 1);
                            localStorageService.cookie.set('facebookUser', response.name, 1);
                            $scope.profileFbImg = response.data.url;
                            $location.path('/');
                        });
                    });
                }
            });

        };
    }

    window.fbAsyncInit = function () {
        FB.init({
            appId: '629213847266342',
            xfbml: true,
            version: 'v2.8'
        });
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

})();