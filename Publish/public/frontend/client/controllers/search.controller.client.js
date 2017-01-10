/**
 * Created by phuc.ngo on 10/01/2017.
 */
(function () {
    'use strict';

    angular.module('ChatBotApp')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope', '$rootScope', '$location', 'SearchService'];

    function SearchController($scope, $rootScope, $location, SearchService) {
        $scope.Search = function () {
            var queryString = document.getElementById('QueryString').value;
            SearchService.SearchForQuestion(queryString).then(function (result) {
                $location.path('/tim-kiem/' + queryString);
                $rootScope.questionsSearch = result.data.questions;
            });
        };
    }
})();