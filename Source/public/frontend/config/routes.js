(function () {
    'use strict';
    angular.module('appRoute', ['ngRoute'])
        .config(config)
        .run(run);
    config.$inject = ['$locationProvider', '$routeProvider', 'localStorageServiceProvider'];
    run.$inject = ['$rootScope', '$location', 'localStorageService'];
    function config($locationProvider, $routeProvider, localStorageServiceProvider) {
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
            .when('/navbar', {
                templateUrl: '/layout/navbar'
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
        //localStorageServiceProvider.setStorageType('sessionStorage');
        localStorageServiceProvider.setDefaultToCookie(true);
    }

    function run($rootScope, $location, localStorageService) {
        var loginUser = localStorageService.cookie.get('currentUser');
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (loginUser && next.originalPath) {
                $location.path('/');
            }
        });
    }
})();