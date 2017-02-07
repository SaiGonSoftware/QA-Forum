/**
 * Created by phuc.ngo on 2/02/2017.
 */
(function () {
    'use strict';

    angular.module('ChatBotApp')
        .controller('UnAnswerQuestionController', UnAnswerQuestionController);

    UnAnswerQuestionController.$inject = ['$scope', 'UnAnswerQuestionService'];

    function UnAnswerQuestionController($scope, UnAnswerQuestionService) {
        UnAnswerQuestionService.GetUnAnswerQuestion().then(function (result) {
            console.log(result);
            $scope.unAnswerQuestions = result.data.unAnswerQuestions;
        });
    }
})();
