(function () {
        'use strict';
        angular.module('appRoute', ['ngRoute'])
            .config(config);
        config.$inject = ['$locationProvider', '$routeProvider'];

        function config($locationProvider, $routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '/partials/index',
                    controller: 'IndexController'
                })
                .when('/view1', {
                    templateUrl: '/partials/view1'
                })
                .when('/details/:id', {
                    templateUrl: '/partials/details',
                    controller: 'DetailController'
                })
                .when('/credit', {
                    templateUrl: '/partials/credit'
                })
                .otherwise({
                    redirectTo: '/page-not-found',
                    templateUrl: '/partials/404'
                });
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }

    })();