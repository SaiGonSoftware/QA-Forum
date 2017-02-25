(function () {
    'use strict';

    angular.module('ChatBotApp')
        .factory('AccountContribService', AccountContribService);

    AccountContribService.$inject = ['$http'];

    function AccountContribService($http) {
        var accountContribService = {};
        accountContribService.GetAllContrib = function (currentUser) {
            return $http({
                url: '/api/Account/Contrib/' + currentUser,
            });
        };
        return accountContribService;
    }
})();
