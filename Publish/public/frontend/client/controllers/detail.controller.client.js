/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-25 23:14:43
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-26 22:02:57
 */

(function () {
    'use strict';

    angular.module('ChatBotApp')
        .controller('DetailController', DetailController);

    DetailController.$inject = ['$scope', '$routeParams', 'QuestionDetailService'];

    function DetailController($scope, $routeParams, QuestionDetailService) {
        var id = $routeParams.id;
        QuestionDetailService.GetQuestionsDetail(id).then(function (result) {
            console.log(result.data.answers);
            if (result.data.found === true) {
                $scope.detail = result.data.questionDetail;
                $scope.refs = result.data.questionDetail.References;
                $scope.listOfAnswers = result.data.answers;
            }
            else $location.path('/page-not-found');
        });
    }
})();