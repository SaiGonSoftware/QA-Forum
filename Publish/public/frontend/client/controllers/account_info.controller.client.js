(function() {
    'use strict';

    angular.module('ChatBotApp')
        .controller('AccountInfoController', AccountInfoController);

    AccountInfoController.$inject = ['$scope', 'localStorageService', 'AccountContribService'];

    function AccountInfoController($scope, localStorageService, AccountContribService) {
        var loginUser = localStorageService.cookie.get('currentUser');
        var facebookUser = localStorageService.cookie.get('facebookUser');
        var currentUser = loginUser ? loginUser : facebookUser;
        AccountContribService.GetAllContrib(currentUser).then(function(result) {
            $scope.user_contribs = result.data.user_contrib;
        });
    }
})();
