(function() {
    angular.module("WebAppMaker")
        .factory("userService", userService);

    function userService($http) {

        var api = {
            login: login,
            logout: logout,
            register: register,
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            unregister: unregister
        };

        return api;

        function unwrap(response) {
            return response.data;
        }

        function login(user) {
            var url = "/assignment/api/login";
            return $http.post(url, user).then(unwrap);
        }

        function logout() {
            var url = "/assignment/api/logout";
            return $http.post(url);
        }

        function register(user) {
            var url = "/assignment/api/register";
            return $http.post(url, user).then(unwrap);
        }

        function createUser(user) {
            var url = "/assignment/api/user";

            return $http.post(url, user).then(unwrap);
        }

        function findUserById(id) {
            var url = "/assignment/api/user/" + id;

            return $http.get(url).then(unwrap);
        }

        function findUserByUsername(username) {
            var url = "/assignment/api/user?username=" + username;

            return $http.get(url).then(unwrap);
        }

        function findUserByCredentials(username, password) {
            var url = "/assignment/api/user?username=" + username + "&password=" + password;

            return $http.get(url).then(unwrap);
        }

        function updateUser(userId, user) {
            var url = "/assignment/api/user/" + userId;

            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/assignment/api/user/" + userId;
            return $http.delete(url);
        }

        function unregister() {
            var url = '/assignment/api/unregister';
            return $http.delete(url);
        }
    }
})();