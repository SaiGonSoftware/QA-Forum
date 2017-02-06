(function () {
    'use strict';

    angular.module('ChatBotApp')
        .controller('AccountInfoController', AccountInfoController);

    AccountInfoController.$inject = ['$scope', '$location', 'localStorageService', 'AccountContribService'];

    function AccountInfoController($scope, $location, localStorageService, AccountContribService) {
        var loginUser = localStorageService.cookie.get('currentUser');
        var facebookUser = localStorageService.cookie.get('facebookUser');
        var currentUser = loginUser ? loginUser : facebookUser;
        if (!currentUser) {
            $location.path('/');
        }
        AccountContribService.GetAllContrib(currentUser).then(function (result) {
            $scope.user_contribs = result.data.user_contrib;
            console.log(result.data.userInfo);
            $scope.userInfos = result.data.userInfo;
        });
    }
})();
