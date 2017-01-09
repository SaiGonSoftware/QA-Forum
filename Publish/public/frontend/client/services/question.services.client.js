/**
 * Created by ngohungphuc on 27/12/2016.
 */
(function () {
    'use strict';

    angular.module('ChatBotApp')
        .factory('PostQuestionService', PostQuestionService)
        .factory('CategoriesService', CategoriesService);

    PostQuestionService.$inject = ['$http'];
    CategoriesService.$inject = ['$http'];

    function CategoriesService($http) {
        var categoriesService = {};
        categoriesService.GetCategories = function () {
            return $http({
                url: '/api/GetCategory',
                method: 'GET'
            });
        };
        return categoriesService;
    }

    function PostQuestionService($http) {
        var questionService = {};
        questionService.PostQuestion = function (result) {
            return $http({
                url: '/api/Account/PostQuestion',
                method: 'POST',
                data: JSON.stringify(result),
                header: {
                    'content-type': 'application/json'
                }
            });
        };
        return questionService;
    }
})();