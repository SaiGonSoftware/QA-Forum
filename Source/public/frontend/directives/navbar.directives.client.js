/**
 * Created by phuc.ngo on 12/20/2016.
 */
// (function () {
//     'use strict';
//     angular
//         .module('ChatBotApp')
//         .directive('navbar-custom', navbar);

//     function navbar(localStorageService) {
//         console.log("before the navbar return statement");
//         return {
//             restrict: 'E',
//             templateUrl: '/layout/navbar.jade',
//             scope: true,
//             controller: function ($scope, localStorageService) {
//                 console.log("inside of the navbar directive");
//                 var loginUser = localStorageService.get('currentUser');
//                 if (loginUser) {
//                     $scope.HideLoginSection = true;
//                     $scope.IsLogin = true;
//                 }
//                 else {
//                     $scope.HideLoginSection = false;
//                     $scope.IsLogin = false;
//                 }
//             }
//         };
//     }
// })();