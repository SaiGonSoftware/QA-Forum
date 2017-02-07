(function () {
    'use strict';

    angular.module('ChatBotApp')
        .controller('AccountInfoController', AccountInfoController);

    AccountInfoController.$inject = ['$scope', '$location', 'localStorageService', 'AccountContribService'];

    function AccountInfoController($scope, $location, localStorageService, AccountContribService) {
        $scope.HideUploadBtn = false;
        $scope.Loading = false;
        $scope.IsFormValid = false;
        $scope.IsFileValid = false;
        $scope.IsAvatarFormSubmitted = false;
        $scope.fileUpload = null;

        var loginUser = localStorageService.cookie.get('currentUser');
        var facebookUser = localStorageService.cookie.get('facebookUser');
        var currentUser = loginUser ? loginUser : facebookUser;
        if (!currentUser) {
            $location.path('/');
        }

        AccountContribService.GetAllContrib(currentUser).then(function (result) {
            $scope.user_contribs = result.data.user_contrib;
            $scope.userInfos = result.data.userInfo;
        });

        $scope.CheckFile = function (element) {
            $scope.$apply(function ($scope) {
                $scope.fileUpload = element.files[0];
                $scope.fileMessage = '';
                var fileName = $scope.fileUpload.name;
                console.log(fileName.length);
                var fileIndex = fileName.lastIndexOf('.');
                var fileExtension = fileName.substring(fileIndex, fileName.length);
                console.log(fileExtension);
                if (fileExtension === '.jpeg' ||
                    fileExtension === '.jpg' ||
                    fileExtension === '.png') {
                    $scope.IsFileValid = true;
                } else {
                    $scope.fileMessage = 'FIle phải có định dạng .jpeg, .jpg hoặc .png';
                }
            });
        };

        $scope.$watch('UploadAvatarForm.$valid', function (isValid) {
            $scope.IsFormValid = isValid;
        });

        $scope.UploadAvatar = function () {
            $scope.IsAvatarFormSubmitted = true;
            if ($scope.IsFileValid && $scope.IsFormValid) {
                console.log('a');
            }

        };
    }
})();
