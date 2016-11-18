/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-06 22:10:19
 * @Last Modified by:   hoangphucvu
 * @Last Modified time: 2016-11-18 15:29:28
 */
(function() {
    'use strict';

    angular.module('ChatBotApp')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', 'QuestionService'];

    function IndexController($scope, QuestionService) {
        QuestionService.GetAllQuestions().then(function(result) {
            $scope.questions = result;
            console.log($scope.questions);
        });
    }
})();