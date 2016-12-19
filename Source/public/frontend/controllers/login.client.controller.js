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

    LoginController.$inject = ['$scope', 'LoginService', '$rootScope', '$location'];

    function LoginController($scope, LoginService, $rootScope, $location) {
        $scope.LoginFormSubmmit = false;
        $scope.IsLoginFormValid = false;
        $scope.HideLoginBtn = false;
        $scope.ShowLoading = false;
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
                        $rootScope.loginUser = localStorage.setItem('currentUser', result.data.userSession);
                        $rootScope.loginUser = localStorage.getItem('currentUser');
                        $rootScope.HideLoginSection = true;
                        $rootScope.IsLogin = true;
                        $location.path(result.data.url);
                    }
                });
            }
        };
    }


})();