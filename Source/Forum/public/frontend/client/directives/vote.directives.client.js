/**
 * Created by phuc.ngo on 17/01/2017.
 */
(function () {
    'use strict';
    angular
        .module('ChatBotApp')
        .directive('vote', vote);

    vote.$inject = ['$rootScope'];
    function vote($rootScope) {
        return {
            restrict: 'E',
            templateUrl: '/directives/vote.html',
            scope: false,
            controller: function ($scope) {

            }
        };
    }
})();

