/**
 * Created by ngohungphuc on 17/12/2016.
 */
/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-06 22:09:26
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-06 22:09:37
 */
(function () {
    'use strict';

    angular.module('ChatBotApp')
        .factory('AnswerService', AnswerService);

    AnswerService.$inject = ['$http'];

    function AnswerService($http) {
        var answerService = {};
        answerService.PostAnswer = function (result, id) {
            return $http({
                url: '/api/Account/PostAnswer/' + id,
                method: 'POST',
                data: JSON.stringify(result),
                header: {
                    'content-type': 'application/json'
                }
            });
        };
        return answerService;
    }
})();

