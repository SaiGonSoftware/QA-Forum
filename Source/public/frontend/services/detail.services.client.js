/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-25 23:20:32
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-26 00:10:49
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
                .error(function() {
                    deferred.reject('Error when getting question');
                }).success(function(data) {
                    deferred.resolve(data);
                });
            return deferred.promise;
        };
        return getQuestionDetailService;
    }
})();