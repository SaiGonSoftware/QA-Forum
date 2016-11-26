/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-25 23:20:32
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-26 11:05:48
 */

(function() {
    'use strict';

    angular.module('ChatBotApp')
        .factory('QuestionDetailService', QuestionDetailService);

    QuestionDetailService.$inject = ['$http', '$q'];

    function QuestionDetailService($http, $q) {
        var getQuestionDetailService = {};
        return $q(function(reject, resolve, $id) {
            $http.get('/api/GetQuestionDetail/' + $id).then(function(response) {
                console.log(response);
                if (response.data.success) {
                    resolve(response.data.msg);
                } else {
                    reject(response.data.msg);
                }
            });
            return getQuestionDetailService;
        });

        /*var getQuestionDetailService = {};
        var deferred = $q.defer();
        getQuestionDetailService.GetQuestionsDetail = function($id) {
            $http.get('/api/GetQuestionDetail/' + $id)
                .error(function() {
                    deferred.reject('Error when getting question');
                }).success(function(response) {
                    console.log(response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        };
        return getQuestionDetailService;*/
    }


})();