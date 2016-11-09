/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-10-29 21:57:50
 * @Last Modified by:   hoangphucvu
 * @Last Modified time: 2016-11-09 11:33:00
 */

(function() {
    'use strict';
    angular.module('ChatBotApp', [
        // Angular modules
        'ngRoute'

        // Custom modules

        // 3rd Party Modules
    ]).config(config);

    config.$inject = ['$locationProvider', '$routeProvider'];

    function config($locationProvider, $routeProvider) {
        $routeProvider
            .when('/view1', {
                templateUrl: 'partials/view1'
            })
            .when('/view2', {
                templateUrl: 'partials/view2'
            })
            .when('/details', {
                templateUrl: 'site/details'
            })
            .when('/dang-nhap', {
                templateUrl: 'account/login'
            })
            .otherwise({
                templateUrl: 'site/index'
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
})();