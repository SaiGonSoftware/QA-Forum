/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-06 22:09:26
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-06 22:09:37
 */
(function () {
    'use strict';

    angular.module('ChatBotApp')
        .factory('RegisterService', RegisterService);

    RegisterService.$inject = ['$http'];

    function RegisterService($http) {
        var registerService = {};
        registerService.RegisterAccount = function (result) {
            return $http({
                url: '/api/Account/Register',
                method: 'POST',
                data: JSON.stringify(result),
                header: {
                    'content-type': 'application/json'
                }
            });
        };
        return registerService;
    }
})();

