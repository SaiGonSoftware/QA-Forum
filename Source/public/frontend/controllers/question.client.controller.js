/**
 * Created by ngohungphuc on 27/12/2016.
 */
(function () {
    'use strict';
    angular
        .module('ChatBotApp')
        .controller('PostQuestionController', PostQuestionController);

    PostQuestionController.$inject = ['$scope', '$location', 'localStorageService', 'PostQuestionService', 'CategoriesService'];

    function PostQuestionController($scope, $location, localStorageService, PostQuestionService, CategoriesService) {
        $scope.QuestionFormSubmmit = false;
        $scope.QuestionFormFormValid = false;
        $scope.HideQuestionBtn = false;
        $scope.ShowLoading = false;
        if (localStorageService.cookie.get('currentUser') !== null) {
            $scope.QuestionData = {
                UserQuestion: localStorageService.cookie.get('currentUser'),
                CategoryId: '',
                Content: '',
                Title: '',
                CreateDate: new Date().toLocaleDateString()
            };
        }
        if (localStorageService.cookie.get('facebookUser') !== null) {
            $scope.QuestionData = {
                UserQuestion: localStorageService.cookie.get('facebookUser'),
                CategoryId: '',
                Content: '',
                Title: '',
                CreateDate: new Date().toLocaleDateString()
            };
        }


        $scope.$watch('QuestionForm.$valid', function (newValue) {
            $scope.QuestionFormFormValid = newValue;
        });

        $scope.PostQuestion = function () {
            console.log('ok');
            $scope.QuestionFormSubmmit = true;
            if (localStorageService.cookie.get('currentUser') === null) {
                toastr.warning("Vui lòng đăng nhập để đăng câu hỏi");
                return false;
            }
            if (localStorageService.cookie.get('facebookUser') === null) {
                toastr.warning("Vui lòng đăng nhập để đăng câu hỏi");
                return false;
            }
            if ($scope.QuestionFormFormValid) {
                console.log('valid');
                $scope.ShowLoading = true;
                $scope.HideQuestionBtn = true;
                PostQuestionService.PostQuestion($scope.QuestionData).then(function (result) {
                    $scope.HideQuestionBtn = false;
                    $scope.ShowLoading = false;
                    if (!result.data.success) {
                        toastr.warning("Có lỗi xảy ra vui lòng thử lại");
                    }
                    else {
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
    }
})();