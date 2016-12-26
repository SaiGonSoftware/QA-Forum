/**
 * Created by ngohungphuc on 04/12/2016.
 */
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
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$scope', '$location', 'RegisterService', 'localStorageService'];

    function RegisterController($scope, $location, RegisterService, localStorageService) {
        $scope.RegisFormSubmmit = false;
        $scope.IsRegisFormValid = false;
        $scope.ShowLoading = false;
        $scope.HideRegisBtn = false;
        $scope.RegisData = {
            UsernameRegis: '',
            EmailRegis: '',
            PasswordRegis: ''
        };

        $scope.$watch('RegisForm.$valid', function (newVal) {
            $scope.IsRegisFormValid = newVal;
        });

        $scope.Register = function () {
            $scope.RegisFormSubmmit = true;
            if (typeof $scope.RegisData.EmailRegis === "undefined") {
                toastr.warning("Vui lòng kiểm tra lại email");
                $scope.ShowLoading = false;
                return false;
            }

            if ($scope.IsRegisFormValid) {
                $scope.HideRegisBtn = true;
                $scope.ShowLoading = true;
                RegisterService.RegisterAccount($scope.RegisData).then(function (result) {
                    if (result.data.foundAccount) {
                        toastr.warning("Tài Khoản đã được đăng kí");
                        $scope.ShowLoading = false;
                        $scope.HideRegisBtn = false;
                    }
                    if (result.data.foundEmail) {
                        toastr.warning("Email đã được đăng kí");
                        $scope.ShowLoading = false;
                        $scope.HideRegisBtn = false;
                    }
                    if (result.data.foundBoth) {
                        toastr.warning("Tài Khoản và Email đã được đăng kí");
                        $scope.ShowLoading = false;
                        $scope.HideRegisBtn = false;
                    }
                    if (result.data.success) {
                        $scope.ShowLoading = false;
                        $scope.HideRegisBtn = false;
                        toastr.success("Đăng kí thành công bạn có thể bắt đầu sử dụng forum");
                        localStorageService.cookie.set('currentUser', $scope.RegisData.UsernameRegis, 1);
                        $location.path(result.data.url);
                    }
                });
            }
        };
    }
})();