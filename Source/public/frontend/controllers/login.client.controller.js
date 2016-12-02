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

    LoginController.$inject = ['$scope', '$location', 'LoginService'];

    function LoginController($scope, $location, LoginService) {
        $scope.IsLogging = false;
        $scope.Submmitted = false;
        $scope.IsFormValid = false;
        $scope.HideLoginBtn = false;
        $scope.ShowLoading = false;
        $scope.LoginData = {
            username: '',
            password: ''
        };

        $scope.$watch('login-form.$valid', function (newValue) {
            $scope.IsFormValid = newValue;
        });

        $scope.Login = function () {
            $scope.IsLogging = true;
            $scope.Submmitted = true;
            //if ($scope.IsFormValid) {
                $scope.ShowLoading = true;
                $scope.HideLoginBtn = true;
                console.log($scope.LoginData);
                LoginService.LoginAccess($scope.LoginData).then(function (result) {
                    console.log(result);
                    if (result.status === 500 || result.status === 404) {
                        alert(result.msg);
                    }

                    else {
                        $scope.IsLogin = true;
                        //window.location.href = "/";
                        $scope.Message = 'Vui lòng kiểm tra tên đăng nhập và mật khẩu';
                        $scope.ShowLoading = false;
                        $scope.HideLoginBtn = false;
                    }
                });
            //}
        };
    }


})();