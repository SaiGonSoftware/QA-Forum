/**
 * Created by ngohungphuc on 02/04/2017.
 */
(function () {
    'use strict';

    angular.module('ChatBotApp')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['localStorageService'];

    function AuthService(localStorageService) {
        var authService = {};
        authService.getAuthToken = function () {
            return  localStorageService.cookie.get('access_token');
        };
        return authService;
    }
})();