/**
 * Created by phuc.ngo on 12/20/2016.
 */

/*(function () {
    'use strict';
    angular
        .module('ChatBotApp')
        .directive('navbar', navbar);

    navbar.$inject = ['localStorageService'];
    function navbar(localStorageService) {
        return {
            restrict: 'E',
            templateUrl: '/layout/navbar.jade',
            scope: true,
            controller: function ($scope) {
                var loginUser = localStorageService.get('currentUser');
                if (loginUser) {
                    $scope.HideLoginSection = true;
                    $scope.IsLogin = true;
                }
                else {
                    $scope.HideLoginSection = false;
                    $scope.IsLogin = false;
                }
            }
        };
    }
})();*/
>>>>>>> 9b2891f52a2b2e27b02cb0e751b293ea9201e973
