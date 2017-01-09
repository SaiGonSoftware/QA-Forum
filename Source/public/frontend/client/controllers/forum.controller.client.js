/**
 * Created by ngohungphuc on 06/01/2017.
 */
(function () {
    'use strict';

    angular.module('ChatBotApp')
        .controller('ForumController', ForumController)
        .controller('TagsController', TagsController)
        .controller('ForumContainController', ForumContainController);

    ForumController.$inject = ['$scope', 'GetQuestionInfoCategoryService'];
    ForumContainController.$inject = ['$scope', '$routeParams', 'GetQuestionViaCategory'];
    TagsController.$inject = ['$scope', 'CategoriesService'];

    function ForumController($scope, GetQuestionInfoCategoryService) {
        GetQuestionInfoCategoryService.GetQuestionInfoCategory().then(function (result) {
            $scope.categories = result.data.categories;
            $scope.postCount = result.data.postCount;
        });
    }

    function TagsController($scope, CategoriesService) {
        CategoriesService.GetCategories().then(function (result) {
            $scope.categories = result.data;
        });
    }


    function ForumContainController($scope, $routeParams, GetQuestionViaCategory) {
        var id = $routeParams.id;
        GetQuestionViaCategory.GetQuestionViaCategory(id).then(function (result) {
            if (result.data.found === true) {
                $scope.questions = result.data.questions;
            }
            else $location.path('/page-not-found');
        });
    }
})();