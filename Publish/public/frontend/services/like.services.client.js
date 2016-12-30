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
        .factory('LikeService', LikeService);

    LikeService.$inject = ['$http'];

    function LikeService($http) {
        var likeService = {};
        likeService.LikeAnswer = function (data) {
            return $http({
                url: '/api/Account/LikeAnswer/',
                method: 'POST',
                data: JSON.stringify(data),
                header: {
                    'content-type': 'application/json'
                }
            });
        };
        return likeService;
    }
})();

