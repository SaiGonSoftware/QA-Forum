/**
 * Created by ngohungphuc on 06/01/2017.
 */
(function () {
    'use strict';

    angular.module('ChatBotApp')
        .controller('ForumController', ForumController)
        .controller('ForumContainController', ForumContainController)
        .controller('TagsController', TagsController);

    ForumController.$inject = ['$scope', 'GetQuestionInfoCategory', '$routeParams'];
    ForumContainController.$inject = ['$scope', 'GetQuestionViaCategory', '$routeParams'];
    TagsController.$inject = ['$scope', 'CategoriesService'];

    function ForumController($scope, GetQuestionInfoCategory) {
        GetQuestionInfoCategory.GetQuestionInfoCategory().then(function (result) {
            $scope.categories = result.data.categories;
            $scope.postCount = result.data.postCount;
        });
    }

    function TagsController($scope, CategoriesService) {
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