/**
 * Created by phuc.ngo on 10/01/2017.
 */

(function () {
    'use strict';

    angular.module('ChatBotApp')
        .factory('SearchService', SearchService);

    SearchService.$inject = ['$http'];

    function SearchService($http) {
        var searchService = {};
        searchService.SearchForQuestion = function (queryString) {
            return $http({
                url: '/api/Search/' + queryString,
                method: 'GET'
            });
        };
        return searchService;
    }
})();

