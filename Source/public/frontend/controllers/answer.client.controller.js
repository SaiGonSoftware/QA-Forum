/**
 * Created by ngohungphuc on 17/12/2016.
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
        .controller('AnswerController', AnswerController);

    AnswerController.$inject = ['$scope', 'localStorageService', 'AnswerService'];

    function AnswerController($scope, localStorageService, AnswerService) {
        $scope.AnswerFormSubmmit = false;
        $scope.AnswerFormFormValid = false;
        $scope.HideAnswerBtn = false;
        $scope.ShowLoading = false;
        var loginUser = localStorageService.cookie.get('currentUser');
        var facebookUser = localStorageService.cookie.get('facebookUser');
        console.log(facebookUser);
        if (loginUser) {
            $scope.AnswerData = {
                UserAnswer: loginUser,
                Content: '',
                CreateDate: new Date().toLocaleDateString()
            };
        }
        if (facebookUser) {
            $scope.AnswerData = {
                UserAnswer: facebookUser,
                Content: '',
                CreateDate: new Date().toLocaleDateString()
            };
        }
        $scope.$watch('AnswerForm.$valid', function (newValue) {
            $scope.AnswerFormFormValid = newValue;
        });

        $scope.PostAnswer = function () {
            $scope.AnswerFormSubmmit = true;
            if (!loginUser && !facebookUser) {
                toastr.warning("Vui lòng đăng nhập để đăng câu trả lời");
                return false;
            }

            if ($scope.AnswerFormFormValid) {
                $scope.ShowLoading = true;
                $scope.HideAnswerBtn = true;
                var id = $('#QuestionId').val();
                AnswerService.PostAnswer($scope.AnswerData, id).then(function (result) {
                    console.log(result);
                    $scope.HideAnswerBtn = false;
                    $scope.ShowLoading = false;
                    if (!result.data.success) {
                        toastr.warning(result.data.msg);
                    }
                    else {
                        toastr.success("Đăng Câu Trả Lời Thành Công");
                    }
                });
            }
        };
    }
})();