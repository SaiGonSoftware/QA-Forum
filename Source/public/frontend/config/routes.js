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
            .when('/bai-viet/:id', {
                templateUrl: '/partials/details'
            })
            .when('/tac-gia', {
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
            .when('/tao-cau-hoi', {
                templateUrl: '/partials/post_question'
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

        window.fbAsyncInit = function () {
            FB.init({
                appId: '1211287998940961',
                xfbml: true,
                version: 'v2.8'
            });
            FB.Event.subscribe('auth.login', function(response) {
                window.location.reload();
            });
            FB.Event.subscribe('auth.logout', function(response) {
                window.location.reload();
            });
            (function() {
                var e = document.createElement('script'); e.async = true;
                e.src = document.location.protocol +
                    '//connect.facebook.net/en_US/all.js';
                document.getElementById('fb-root').appendChild(e);
            }());
            function facebookLogin() {
                FB.login(function(response) {
                    // handle the response
                }, {scope: 'email, publish_stream, read_friendlists'});
            }
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    function run($rootScope, $location, localStorageService) {
        var loginUser = localStorageService.cookie.get('currentUser');
        var facebookUser = localStorageService.cookie.get('facebookUser');
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (loginUser && !facebookUser && next.originalPath === '/dang-nhap') {
                $location.path('/');
            }
            if (!loginUser && facebookUser && next.originalPath === '/dang-nhap') {
                $location.path('/');
            }
        });
    }
})();