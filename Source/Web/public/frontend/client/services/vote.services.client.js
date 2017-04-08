/**
 * Created by ngohungphuc on 29/12/2016.
 */
/**
 * Created by ngohungphuc on 17/12/2016.
 */
/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-06 22:09:26
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-06 22:09:37
 */
(function () {
    'use strict';

    angular.module('ChatBotApp')
        .factory('LikeService', LikeService)
        .factory('DislikeService', DislikeService);

    LikeService.$inject = ['$http', 'AuthService'];
    DislikeService.$inject = ['$http', 'AuthService'];
    function LikeService($http, AuthService) {
        var likeService = {};
        var token = AuthService.getAuthToken();
        likeService.LikeAnswer = function (data) {
            return $http({
                url: '/api/Account/LikeAnswer/',
                method: 'POST',
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
        };
        return likeService;
    }

    function DislikeService($http, AuthService) {
        var disLikeService = {};
        var token = AuthService.getAuthToken();
        disLikeService.DislikeAnswer = function (data) {
            return $http({
                url: '/api/Account/DislikeAnswer/',
                method: 'POST',
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
        };
        return disLikeService;
    }
})();