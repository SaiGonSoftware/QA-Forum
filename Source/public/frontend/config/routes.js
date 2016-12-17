(function () {
    'use strict';
    angular.module('appRoute', ['ngRoute'])
        .config(config)
        .run(run);
    config.$inject = ['$locationProvider', '$routeProvider'];
    run.$inject = ['$rootScope', '$http', '$location'];
    function config($locationProvider, $routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/partials/index'
            })
            .when('/main-page', {
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

    function run($rootScope, $http, $location) {
        // keep user logged in after page refresh
        /*if (localStorage.getItem('currentUser') === null) {
            $location.path('/dang-nhap');
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            if (localStorage.getItem('currentUser') === null) {
                $location.path('/dang-nhap');
            }
        });*/
    }
})();