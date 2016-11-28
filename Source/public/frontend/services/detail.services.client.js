/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-25 23:20:32
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-26 22:02:25
 */

(function() {
    'use strict';

    angular.module('ChatBotApp')
        .factory('QuestionDetailService', QuestionDetailService);

    QuestionDetailService.$inject = ['$http', '$q'];

    function QuestionDetailService($http, $q) {
        var getQuestionDetailService = {};
        var deferred = $q.defer();
        getQuestionDetailService.GetQuestionsDetail = function($id) {
            $http.get('/api/GetQuestionDetail/' + $id)
                .error(function(response) {
                    deferred.reject(response.msg);
                }).success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        };
        return getQuestionDetailService;
    }


})();