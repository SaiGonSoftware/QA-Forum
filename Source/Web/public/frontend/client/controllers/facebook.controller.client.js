/**
 * Created by ngohungphuc on 14/12/2016.
 */
/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-06 22:10:19
 * @Last Modified by:   hoangphucvu
 * @Last Modified time: 2017-03-02 08:15:58
 */
(function() {
    'use strict';

    angular.module('ChatBotApp')
        .controller('FacebookController', FacebookController);
    FacebookController.$inject = ['$scope', 'localStorageService', '$rootScope', '$location', '$facebook', 'FacebookService'];

    function FacebookController($scope, localStorageService, $rootScope, $location, $facebook, FacebookService) {
        $rootScope.IsFacebookLogin = false;

        $scope.facebookLogin = function() {
            $facebook.login().then(function() {
                $facebook.api("/me").then(function(response) {
                    $rootScope.facebookUser = response.name;
                    $facebook.api("/me/picture").then(function(avatar) {
                        $rootScope.facebookAvatar = avatar.data.url;
                        $scope.FacebookData = {
                            SocialAccount: response.name,
                            SocialId: response.id,
                            FacebookAvatar: avatar.data.url
                        };
                        
                        localStorageService.cookie.set('facebookUser', response.name, 7);
                        localStorageService.cookie.set('facebookAvatar', avatar.data.url, 7);
                        FacebookService.SaveFacebookAccount($scope.FacebookData).then(function(result) {
                            if (result.data) {
                                $rootScope.IsFacebookLogin = true;
                                $rootScope.HideLoginSection = true;
                                $rootScope.IsLogin = false;
                            }
                        });
                    });

                });
                $location.path('/');
            });
        };
    }
})();