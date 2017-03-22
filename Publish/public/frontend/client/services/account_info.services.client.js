(function() {
    'use strict';

    angular.module('ChatBotApp')
        .factory('AccountContribService', AccountContribService)
        .factory('UploadAvatarService', UploadAvatarService);
    AccountContribService.$inject = ['$http'];
    UploadAvatarService.$inject = ['$http', '$q'];

    function AccountContribService($http) {
        var accountContribService = {};
        accountContribService.GetAllContrib = function(currentUser) {
            return $http({
                url: '/api/Account/Contrib/' + currentUser,
            });
        };
        return accountContribService;
    }

    function UploadAvatarService($http, $q) {
        var uploadAvatarService = {};
        uploadAvatarService.UploadAvatar = function(file, user) {
            var url = '/api/Account/UploadAvatar/'+ user;
            var formData = new FormData();
            formData.append('file', file);
            var defer = $q.defer();
            $http.post(url,
                    formData, {
                        headers: {
                            'Content-type': undefined
                        },
                        transformRequest: angular.identity
                    })
                .success(function(data) {
                    defer.resolve(data);
                })
                .error(function() {
                    defer.reject("File Upload Failed!");
                });
            return defer.promise;
        };
        return uploadAvatarService;
    }
})();