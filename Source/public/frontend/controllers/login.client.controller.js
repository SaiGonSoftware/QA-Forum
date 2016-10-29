/*
* @Author: Ngo Hung Phuc
* @Date:   2016-10-29 21:57:33
* @Last Modified by:   Ngo Hung Phuc
* @Last Modified time: 2016-10-29 22:26:17
*/
(function(){
	'use strict';
	angular
	.module('ChatBotApp')
	.controller('LoginCtrl',LoginCtrl)
	.factory('LoginService',LoginService);

	LoginCtrl.$inject = ['$scope','$location','LoginService'];

	function LoginCtrl($scope, $location, LoginService){
		$scope.IsLogging = false;
		$scope.Submmitted = false;
		$scope.IsFormValid = false;

		$scope.LoginData = {
			userName:'',
			passWord:''
		};

		$scope.$watch('loginForm.$valid',function(newValue){
			$scope.IsFormValid =newValue;
		});

		$scope.Login = function(){
			$scope.IsLogging = true;
			$scope.Submmitted = true;
			if($scope.IsFormValid){
				$scope.ShowLoading = true;
				$scope.HideLoginBtn = true;
				LoginService.LoginAccess($scope.LoginData).then(function(result){
					if (result.data === true) {
						$scope.IsLogin = true;
						window.location.href = "/index";
					} else {
						$scope.Message = 'Vui lòng kiểm tra tên đăng nhập và mật khẩu';
						$scope.ShowLoading = false;
						$scope.HideLoginBtn = false;
					}
				});
			}
		};
	}

	function LoginService($http){
		var factory = {};
		factory.LoginAccess = function(result){
			return $http({
				url:'/login/signIn',
				method:'POST',
				data:JSON.stringify(result),
				header: { 'content-type': 'application/json' }
			});
		};
		return factory;
	}
})();
