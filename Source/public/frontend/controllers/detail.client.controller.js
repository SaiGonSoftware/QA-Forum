/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-25 23:14:43
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-26 00:09:40
 */

(function() {
    'use strict';

    angular.module('ChatBotApp')
        .controller('DetailController', DetailController);

    DetailController.$inject = ['$scope', '$routeParams', 'QuestionDetailService'];

    function DetailController($scope, $routeParams, QuestionDetailService) {
        var id = $routeParams.id;
        QuestionDetailService.GetQuestionsDetail(id).then(function(result) {
            $scope.detail = result;
            console.log("data" + $scope.detail);
        });
    }
})();