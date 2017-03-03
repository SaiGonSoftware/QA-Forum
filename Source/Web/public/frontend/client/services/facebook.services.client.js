/**
 * Created by phuc.ngo on 17/01/2017.
 */
(function () {
    'use strict';

    angular.module('ChatBotApp')
        .factory('FacebookService', FacebookService);

    FacebookService.$inject = ['$http'];

    function FacebookService($http) {
        var facebookService = {};
        facebookService.SaveFacebookAccount = function (data) {
            return $http({
                url: '/api/Account/Login/',
                method: 'POST',
                data: JSON.stringify(data),
                header: {
                    'content-type': 'application/json'
                }
            });
        };
        return facebookService;
    }


})();