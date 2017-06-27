(function() {
    angular.module('Sharm')
        .controller('postFeedController', postFeedController);

    function postFeedController(userService, postService, $scope) {
        var model = this;

        model.post = post;
        model.removePost = removePost;

        model.login = login;

        userService.getCurrentUser()
            .then(function(user) {
                model.currentUser = user;
            });

        model.thread = {};
        model.thread.username = $scope.username;

        refreshThread();

        function refreshThread() {
            postService.findPostsByUsername(model.thread.username)
                .then(function(data) {
                    model.thread.posts = data;
                });
        }

        function post(content) {
            if (!content)
                return;
            postService.post(model.thread.username, content)
                .then(function(response) {
                    if (response.data === 'Not logged in')
                        login();
                    else {
                        model.content = '';
                        refreshThread();
                    }
                });
        }

        function removePost(commentId) {
            postService.removePost(commentId)
                .then(function(response) {
                    refreshThread();
                });
        }

        function login() {
            $('#loginModal').modal();
        }
    }
})();