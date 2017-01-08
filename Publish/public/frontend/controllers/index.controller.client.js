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

    IndexController.$inject = ['$scope', 'QuestionService', 'GetNextQuestionService'];

    function IndexController($scope, QuestionService, GetNextQuestionService) {
        $scope.requestTime = 1;
        QuestionService.GetQuestions().then(function (result) {
            $scope.questions = result.data.questions;
        });

        $scope.LoadMore = function () {
            $scope.requestTime += 1;
            GetNextQuestionService.GetNextQuestions($scope.requestTime).then(function (result) {
                $scope.questions = result.data.questions;
            });
        };
    }
})();