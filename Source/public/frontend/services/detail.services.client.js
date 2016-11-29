/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-25 23:20:32
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-26 22:02:25
 */

(function () {
    'use strict';

    angular.module('ChatBotApp')
        .factory('QuestionDetailService', QuestionDetailService);

    QuestionDetailService.$inject = ['$http'];

    function QuestionDetailService($http) {
        var getQuestionDetailService = {};
        getQuestionDetailService.GetQuestionsDetail = function ($id) {
            return $http.get('/api/GetQuestionDetail/' + $id, {cache: false});
        };
        return getQuestionDetailService;
    }


})();