/*
 * @Author: hoangphucvu
 * @Date:   2016-11-18 14:10:38
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-27 22:21:07
 */
(function () {
    'use strict';

    angular.module('ChatBotApp')
        .factory('QuestionService', QuestionService);

    QuestionService.$inject = ['$http'];

    function QuestionService($http) {
        var getAllQuestionService = {};
        getAllQuestionService.GetAllQuestions = function () {
            return $http.get('/api/GetAllQuestion');
        };
        return getAllQuestionService;
    }
})();