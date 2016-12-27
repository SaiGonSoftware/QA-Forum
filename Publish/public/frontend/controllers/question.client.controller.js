/**
 * Created by ngohungphuc on 27/12/2016.
 */
(function () {
    'use strict';
    angular
        .module('ChatBotApp')
        .controller('PostQuestionController', PostQuestionController);

    PostQuestionController.$inject = ['$scope', 'localStorageService', 'PostQuestionService', 'CategoriesService'];

    function PostQuestionController($scope, localStorageService, PostQuestionService, CategoriesService) {
        $scope.QuestionFormSubmmit = false;
        $scope.QuestionFormFormValid = false;
        $scope.HideQuestionBtn = false;
        $scope.ShowLoading = false;

        $scope.QuestionData = {
            UserQuestion: localStorageService.cookie.get('currentUser'),
            CategoryId: '',
            Content: '',
            Title: '',
            CreateDate: new Date().toLocaleDateString()
        };

        $scope.$watch('QuestionForm.$valid', function (newValue) {
            $scope.AnswerFormFormValid = newValue;
        });

        $scope.PostQuestion = function () {
            $scope.QuestionFormSubmmit = true;
            if (localStorageService.cookie.get('currentUser') === null) {
                toastr.warning("Vui lòng đăng nhập để đăng câu hỏi");
                return false;
            }

            if ($scope.QuestionFormFormValid) {
                $scope.ShowLoading = true;
                $scope.HideQuestionBtn = true;
                /*AnswerService.PostAnswer($scope.AnswerData, id).then(function (result) {
                 $scope.HideAnswerBtn = false;
                 $scope.ShowLoading = false;
                 if (!result.data.success) {
                 bootbox.alert(result.data.msg);
                 }
                 else {
                 toastr.warning("Đăng Câu Trả Lời Thành Công");
                 }
                 });*/
            }
        };

        CategoriesService.GetCategories().then(function (result) {
            console.log(result);
            $scope.categories = result.data.categories;
        });
    }
})();