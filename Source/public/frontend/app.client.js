/*
* @Author: Ngo Hung Phuc
* @Date:   2016-10-29 21:57:50
* @Last Modified by:   Ngo Hung Phuc
* @Last Modified time: 2016-11-06 22:47:38
*/

(function(){
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
        .when('/details',
        {
            templateUrl: 'site/details'
        })
        .when('/dang-nhap',
        {
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