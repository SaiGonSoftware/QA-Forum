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
        $scope.HideRegisBtn = false;
        $scope.ShowLoading = false;

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
            $scope.ShowLoading = true;
            $scope.HideRegisBtn = true;
            if (typeof $scope.RegisData.EmailRegis === "undefined") {
                alert("Vui lòng kiểm tra lại email");
            }

            if ($scope.IsRegisFormValid) {
                RegisterService.RegisterAccount($scope.RegisData).then(function (result) {
                    console.log(result);
                    /*if (result.status === 500 || result.status === 404) {
                        alert(result.msg);
                    }

                    else {
                        //window.location.href = "/";
                        $scope.ShowLoading = false;
                        $scope.HideRegisBtn = false;
                    }*/
                });
            }
        };
    }


})();