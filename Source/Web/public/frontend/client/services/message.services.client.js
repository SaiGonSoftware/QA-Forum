(function () {
    'use strict';

    angular.module('ChatBotApp')
        .factory('SaveMessageService', SaveMessageService)
        .factory('GetMessageService', GetMessageService);

    SaveMessageService.$inject = ['$http', 'AuthService'];
    GetMessageService.$inject = ['$http'];

    function SaveMessageService($http, AuthService) {
        var saveMessageService = {};
        var token = AuthService.getAuthToken();
        saveMessageService.SaveMessage = function (message) {
            return $http({
                url: '/api/Account/SaveMessage',
                method: 'POST',
                data: JSON.stringify(message),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
        };
        return saveMessageService;
    }

    function GetMessageService($http) {
        var getMessageService = {};
        getMessageService.GetMessage = function (message) {
            return $http({
                url: '/api/Account/GetMessage',
                method: 'GET'
            });
        };
        return getMessageService;
    }
})();