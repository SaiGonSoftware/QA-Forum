(function () {
        'use strict';
        angular.module('appRoute', ['ngRoute'])
            .config(config);
        config.$inject = ['$locationProvider', '$routeProvider'];

        function config($locationProvider, $routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '/partials/index'
                })
                .when('/main-page',{
                    templateUrl: '/partials/index'
                })
                .when('/view1', {
                    templateUrl: '/partials/view1'
                })
                .when('/details/:id', {
                    templateUrl: '/partials/details'
                })
                .when('/credit', {
                    templateUrl: '/partials/credit'
                })
                .when('/dang-nhap', {
                    templateUrl: '/partials/login'
                })
                .when('/dang-ky', {
                    templateUrl: '/partials/register'
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