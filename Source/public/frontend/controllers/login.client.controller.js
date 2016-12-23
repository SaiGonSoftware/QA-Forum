/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-10-29 21:57:33
 * @Last Modified by:   hoangphucvu
 * @Last Modified time: 2016-11-10 11:40:25
 */
(function () {
    'use strict';
    angular
        .module('ChatBotApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'LoginService', '$location', 'localStorageService'];

    function LoginController($scope, LoginService, $location, localStorageService) {
        $scope.LoginFormSubmmit = false;
        $scope.IsLoginFormValid = false;
        $scope.HideLoginBtn = false;
        $scope.ShowLoading = false;
        $scope.HideLoginSection = false;
        $scope.IsLogin = false;
        $scope.LoginData = {
            UsernameLogin: '',
            PasswordLogin: ''
        };

        $scope.$watch('LoginForm.$valid', function (newValue) {
            $scope.IsLoginFormValid = newValue;
        });

        $scope.Login = function () {
            $scope.LoginFormSubmmit = true;
            if ($scope.IsLoginFormValid) {
                $scope.ShowLoading = true;
                $scope.HideLoginBtn = true;
                LoginService.LoginAccess($scope.LoginData).then(function (result) {
                    $scope.HideLoginBtn = false;
                    $scope.ShowLoading = false;
                    if (!result.data.login) {
                        bootbox.alert("Vui lòng kiểm tra thông tin đăng nhập");
                        return false;
                    }
                    else {
                        localStorageService.cookie.set('currentUser', result.data.userSession, 1);
                        $scope.HideLoginSection = true;
                        $scope.IsLogin = true;
                        $location.path(result.data.url);
                    }
                });
            }
        };
    }
})();