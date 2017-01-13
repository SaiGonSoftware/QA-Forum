/**
 * Created by phuc.ngo on 10/01/2017.
 */
(function () {
    'use strict';

    angular.module('ChatBotApp')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope', '$rootScope', '$location', '$routeParams', 'SearchService'];

    function SearchController($scope, $rootScope, $location, $routeParams, SearchService) {
        var searchString = $routeParams.queryString;
        if (searchString) {
            SearchService.SearchForQuestion(searchString).then(function (result) {
                $scope.questionsSearch = result.data.questions;
            });
        }

        $scope.Search = function () {
            var queryString = document.getElementById('QueryString').value;
            SearchService.SearchForQuestion(queryString).then(function (result) {
                $location.path('/tim-kiem/' + queryString);
                $rootScope.questionsSearch = result.data.questions;
            });
        };
    }
})();