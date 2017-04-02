/**
 * Created by ngohungphuc on 27/12/2016.
 */
(function () {
    'use strict';
    angular
        .module('ChatBotApp')
        .controller('PostQuestionController', PostQuestionController);

    PostQuestionController.$inject = ['$scope', '$location', 'localStorageService', 'PostQuestionService', 'CategoriesService', 'AutoCompleteService', 'AuthService'];

    function PostQuestionController($scope, $location, localStorageService, PostQuestionService, CategoriesService, AutoCompleteService, AuthService) {
        $scope.QuestionFormSubmmit = false;
        $scope.QuestionFormFormValid = false;
        $scope.HideQuestionBtn = false;
        $scope.ShowLoading = false;
        var loginUser = localStorageService.cookie.get('currentUser');
        var facebookUser = localStorageService.cookie.get('facebookUser');
        var currentUser = loginUser ? loginUser : facebookUser;

        $scope.QuestionData = {
            UserQuestion: currentUser,
            CategoryId: '',
            Content: '',
            Title: '',
            CreateDate: new Date().toLocaleDateString()
        };


        $scope.$watch('QuestionForm.$valid', function (newValue) {
            $scope.QuestionFormFormValid = newValue;
        });

        $scope.PostQuestion = function () {
            $scope.QuestionFormSubmmit = true;
            if (!currentUser) {
                toastr.warning("Vui lòng đăng nhập để đăng câu trả lời");
                return false;
            }

            if ($scope.QuestionFormFormValid) {
                $scope.ShowLoading = true;
                $scope.HideQuestionBtn = true;
                PostQuestionService.PostQuestion($scope.QuestionData).then(function (result) {
                    $scope.HideQuestionBtn = false;
                    $scope.ShowLoading = false;
                    if (!result.data.success) {
                        toastr.warning("Có lỗi xảy ra vui lòng thử lại");
                    } else {
                        toastr.success("Đăng Câu Hỏi Thành Công");
                        $location.path(result.data.url);
                    }
                });
            }
        };

        CategoriesService.GetCategories().then(function (result) {
            $scope.categories = Object.keys(result.data).map(function (key) {
                return result.data[key];
            });
        });


        $scope.autoComplete = function () {
            var searchString = $scope.QuestionData.Title;
            var pendingRequest = setTimeout(function () {
                AutoCompleteService.AutoComplete(searchString).then(function (result) {
                    $scope.isAutoComplete = true;
                    $scope.autoCompleteResults = result.data.autoCompleteResults;
                });
            }, 2000);
        };
    }
})();
