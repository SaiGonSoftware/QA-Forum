/**
 * Created by ngohungphuc on 06/01/2017.
 */

(function () {
    'use strict';

    angular.module('ChatBotApp')
        .factory('GetCatForumService', GetCatForumService);
    GetCatForumService.$inject = ['$http'];

    function GetCatForumService($http) {
        var getCatService = {};
        getCatService.GetCatForumService = function () {
            return $http.get('/api/GetCategory/');
        };
        return getCatService;
    }

})();