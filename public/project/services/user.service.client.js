(function() {
    angular.module('Sharm')
        .factory('userService', userService);

    function userService($http) {
        return {
            register: register,
            login: login
        };

        function register(user) {
            return $http.post('/project/rest/register', user)
                .then(function(response) {
                    return response.data;
                });
        }

        function login(user) {
            return $http.post('/project/rest/login', user)
                .then(function(response) {
                    return response.data;
                })
        }
    }
})();