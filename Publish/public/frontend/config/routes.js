(function() {
    'use strict';
    angular.module('appRoute', ['ngRoute'])
        .config(config);
    config.$inject = ['$locationProvider', '$routeProvider'];

    function config($locationProvider, $routeProvider) {
        $routeProvider
            .when('/view1', {
                templateUrl: '/partials/view1'
            })
            .when('/view2', {
                templateUrl: '/partials/view2'
            })
            .when('/details', {
                templateUrl: '/partials/details'
            })
            .otherwise({
                templateUrl: '/partials/index'
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
})();