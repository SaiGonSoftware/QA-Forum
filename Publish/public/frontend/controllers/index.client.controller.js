/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-06 22:10:19
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-19 22:37:18
 */
(function () {
    'use strict';

    angular.module('ChatBotApp')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', 'QuestionService', '$window'];

    function IndexController($scope, QuestionService, $window) {
        QuestionService.GetAllQuestions().then(function (result) {
            $scope.totalPage = new Array(result.data.pages);
            $scope.questions = result.data.questions;
        });

        $scope.PageRequest = function (page) {
            var requestPage = page + 1;
            QuestionService.GetAllQuestions(requestPage).then(function (result) {
                $window.scrollTo(0, angular.element(document.getElementById("main-page").offsetTop));
                $scope.totalPage = new Array(result.data.pages);
                $scope.questions = result.data.questions;
            });

        };
    }
})();