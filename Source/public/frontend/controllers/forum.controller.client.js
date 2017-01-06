/**
 * Created by ngohungphuc on 06/01/2017.
 */
(function () {
    'use strict';

    angular.module('ChatBotApp')
        .controller('ForumController', ForumController);

    ForumController.$inject = ['$scope', 'ForumService'];

    function ForumController($scope, ForumService) {
        ForumService.GetCatForumService().then(function (result) {
            console.log(result);
            $scope.categories = result.data.categories;
        });
    }
})();