/**
 * Created by ngohungphuc on 06/01/2017.
 */
(function () {
    'use strict';

    angular.module('ChatBotApp')
        .controller('ForumController', ForumController)
        .controller('ForumContainController', ForumContainController);

    ForumController.$inject = ['$scope', 'CategoriesService', 'GetQuestionViaCategory', '$routeParams'];

    function ForumController($scope, CategoriesService) {
        CategoriesService.GetCategories().then(function (result) {
            $scope.categories = result.data;
        });
    }

    function ForumContainController($routeParams, $scope, GetQuestionViaCategory) {
        var id = $routeParams.id;
        GetQuestionViaCategory.GetQuestionViaCategory(id).then(function (result) {
            if (result.data.found === true) {
                $scope.questions = result.data.questions;
            }
            else $location.path('/page-not-found');
        });
    }
})();