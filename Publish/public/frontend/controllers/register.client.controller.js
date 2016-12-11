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

    RegisterController.$inject = ['$scope', '$location', 'RegisterService'];

    function RegisterController($scope, $location, RegisterService) {
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
            $scope.HideRegisBtn = true;
            $scope.ShowLoading = true;
            if (typeof $scope.RegisData.EmailRegis === "undefined") {
                alert("Vui lòng kiểm tra lại email");
                $scope.ShowLoading = false;
                return false;
            }

            if ($scope.IsRegisFormValid) {
                RegisterService.RegisterAccount($scope.RegisData).then(function (result) {
                    if(result.data.foundAccount) {
                        bootbox.alert("Tài Khoản đã được đăng kí");
                        $scope.ShowLoading = false;
                        $scope.HideRegisBtn = false;
                    }
                    if(result.data.foundEmail) {
                        bootbox.alert("Email đã được đăng kí");
                        $scope.ShowLoading = false;
                        $scope.HideRegisBtn = false;
                    }
                    if(result.data.foundBoth) {
                        bootbox.alert("Tài Khoản và Email đã được đăng kí");
                        $scope.ShowLoading = false;
                        $scope.HideRegisBtn = false;
                    }
                    if(result.data.success){
                        $scope.ShowLoading = false;
                        $scope.HideRegisBtn = false;
                        $location.path(result.data.url);
                        bootbox.alert("Đăng kí thành công bạn có thể bắt đầu sử dụng forum");
                    }
                });
            }
        };
    }
})();