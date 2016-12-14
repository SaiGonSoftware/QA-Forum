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
    FacebookController.$inject = ['$scope'];

    function FacebookController($scope) {
        $scope.isFacebookLogin = false;
        $scope.facebookLogin = function () {
            FB.login(function (response) {
               if(response.authResponse){
                   console.log('Getting userinfo');
                   FB.api('/me',function (response) {
                      console.log('Hi' + response.name);
                   });
               }
            });
        };

        $scope.facebookLogout = function () {

        };

    }

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1211287998940961',
            xfbml      : true,
            version    : 'v2.8'
        });
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

})();