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

    AnswerController.$inject = ['$scope', '$rootScope', 'localStorageService', '$location', 'AnswerService', 'QuestionDetailService'];

    function AnswerController($scope, $rootScope, localStorageService, $location, AnswerService, QuestionDetailService) {
        var id = $location.absUrl().split('/')[4];
        $scope.AnswerFormSubmmit = false;
        $scope.AnswerFormFormValid = false;
        $scope.HideAnswerBtn = false;
        $scope.ShowLoading = false;
        var loginUser = localStorageService.cookie.get('currentUser');
        var facebookUser = localStorageService.cookie.get('facebookUser');
        var currentUser = loginUser ? loginUser : facebookUser;

        $scope.AnswerData = {
            UserAnswer: currentUser,
            Content: '',
            CreateDate: new Date().toLocaleDateString()
        };

        $scope.$watch('AnswerForm.$valid', function (newValue) {
            $scope.AnswerFormFormValid = newValue;
        });

        $scope.PostAnswer = function () {
            $rootScope.IsLoadingAnswer = true;
            $scope.AnswerFormSubmmit = true;
            if (!currentUser) {
                toastr.warning("Vui lòng đăng nhập để đăng câu trả lời");
                return false;
            }

            if ($scope.AnswerFormFormValid) {
                $scope.ShowLoading = true;
                $scope.HideAnswerBtn = true;
                var id = document.getElementById('QuestionId').value;
                AnswerService.PostAnswer($scope.AnswerData, id).then(function (result) {
                    $scope.HideAnswerBtn = false;
                    $scope.ShowLoading = false;
                    if (!result.data.success) {
                        toastr.warning(result.data.msg);
                    }
                    else {
                        toastr.success("Đăng Câu Trả Lời Thành Công");
                        QuestionDetailService.GetQuestionsDetail(id).then(function (result) {
                            var lastElement = result.data.answers.slice(-1)[0];
                            $rootScope.listOfAnswersData.push({
                                Content: document.getElementById('Content').value,
                                CreateDate: new Date().toLocaleDateString(),
                                Dislike: [],
                                Like: [],
                                QuestionId: id,
                                _id: lastElement._id,
                                References: [],
                                UserAnswer: currentUser
                            });
                        });
                    }
                });
            }
        };
    }
})();
