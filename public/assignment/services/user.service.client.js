(function() {
    angular.module("WebAppMaker")
        .factory("userService", userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        return api;

        function createUser(user) {
            user._id = new Date().getTime() + "";
            if (!findUserByUsername(user.username)) {
                users.push(user);
            }
        }

        function findUserById(id) {
            var user = users.find(function(user) {
                return user._id === id;
            });

            if (typeof user === 'undefined')
                return null;
            return user;
        }

        function findUserByUsername(username) {
            var user = users.find(function(user) {
                return user.username === username;
            });

            if (typeof user === 'undefined')
                return null;
            return user;
        }

        function findUserByCredentials(username, password) {
            var user = users.find(function(user) {
                return user.username === username && user.password === password;
            });


            if (typeof user === 'undefined')
                return null;
            return user;
        }

        function updateUser(userId, user) {
            for (var u in users) {
                var found = users[u];
                if (found._id === userId) {
                    users[u] = user;
                    return true;
                }
            }
            return false;
        }

        function deleteUser(userId) {
            var u = 0;
            while (u < users.length) {
                if (users[u]._id === userId) {
                    users.splice(u, 1);
                    break;
                }
            }
        }
    }
})();