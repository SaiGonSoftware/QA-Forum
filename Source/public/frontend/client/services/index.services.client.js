/*
 * @Author: hoangphucvu
 * @Date:   2016-11-18 14:10:38
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-27 22:21:07
 */
(function () {
    'use strict';

    angular.module('ChatBotApp')
        .factory('QuestionService', QuestionService)
        .factory('GetNextQuestionService', GetNextQuestionService);
    QuestionService.$inject = ['$http'];
    GetNextQuestionService.$inject = ['$http'];

    function QuestionService($http) {
        var getAllQuestionService = {};
        getAllQuestionService.GetQuestions = function () {
            return $http.get('/api/GetQuestion/');
        };
        return getAllQuestionService;
    }

    function GetNextQuestionService($http) {
        var getNextQuestionService = {};
        getNextQuestionService.GetNextQuestions = function (requestTime) {
            return $http.get('/api/GetNextQuestion/' + requestTime);
        };
        return getNextQuestionService;
    }
})();