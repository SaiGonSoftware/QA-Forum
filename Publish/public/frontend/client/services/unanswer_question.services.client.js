/**
 * Created by phuc.ngo on 2/02/2017.
 */
(function () {
    'use strict';

    angular.module('ChatBotApp')
        .factory('UnAnswerQuestionService', UnAnswerQuestionService);

    UnAnswerQuestionService.$inject = ['$http'];

    function UnAnswerQuestionService($http) {
        var unAnswerquestionService = {};
        unAnswerquestionService.GetUnAnswerQuestion = function () {
            return $http({url: '/api/GetUnAnswerQuestion'});
        };
        return unAnswerquestionService;
    }
})();
