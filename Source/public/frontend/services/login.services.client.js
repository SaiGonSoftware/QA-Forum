/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-06 22:09:26
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-06 22:09:37
 */
(function () {
    'use strict';

    angular.module('ChatBotApp')
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$http'];

    function LoginService($http) {
        var loginService = {};
        loginService.LoginAccess = function (result) {
            return $http({
                url: '/api/Account/Login',
                method: 'POST',
                data: JSON.stringify(result),
                header: {
                    'content-type': 'application/json'
                }
            });
        };
        return loginService;
    }
})();

