/**
 * Created by ngohungphuc on 06/01/2017.
 */
(function () {
    'use strict';

    angular.module('ChatBotApp')
        .controller('ForumController', ForumController);

    ForumController.$inject = ['$scope', 'CategoriesService'];

    function ForumController($scope, CategoriesService) {
        CategoriesService.GetCategories().then(function (result) {
            console.log(result);
            $scope.categories = Object.keys(result.data).map(function (key) {
                return result.data[key];
            });
        });
    }
})();