(function() {
    angular.module('Sharm')
        .controller('manageUserController', manageUserController);

    function manageUserController(userService, commentService, postService, $location, $routeParams) {
        var model = this;

        model.commentsHidden = true;
        model.postsHidden = true;

        model.parseThreadToUrl = parseThreadToUrl;
        model.removeComment = removeComment;
        model.removePost = removePost;
        model.toggleComments = toggleComments;
        model.togglePosts = togglePosts;
        model.deleteUser = deleteUser;

        var username = $routeParams['username'];

        userService.findUserByUsername(username)
            .then(function(user) {
                model.user = user;
            });

        refreshComments();
        refreshPosts();

        function refreshComments() {
            commentService.findCommentsByUsername(username)
                .then(function (comments) {
                    model.comments = comments;
                });
        }

        function refreshPosts() {
            postService.findPostsByUsername(username)
                .then(function (posts) {
                    model.posts = posts;
                });
        }

        function parseThreadToUrl(thread) {
            var url = '#!/';
            var parts = thread.split(':');
            switch(parts[0]) {
                case 'user':
                    url += 'profile/' + parts[1];
                    break;
                case 'track':
                    url += 'm/track/' + parts[1];
                    break;
                case 'album':
                    url += 'm/album/' + parts[1];
                    break;
                default:
                    return;
            }

            return url;
        }


        function removeComment(commentId) {
            commentService.removeComment(commentId)
                .then(function(response) {
                    refreshComments();
                });
        }

        function removePost(commentId) {
            postService.removePost(commentId)
                .then(function(response) {
                    refreshPosts();
                });
        }

        function toggleComments() {
            $('#comment-section').toggleClass('hidden')
            model.commentsHidden = !model.commentsHidden;
        }

        function togglePosts() {
            $('#post-section').toggleClass('hidden')
            model.postsHidden = !model.postsHidden;
        }

        function deleteUser(user) {
            userService.unregister(user)
                .then(function(response) {
                    $location.url('/admin');
                });
        }
    }
})();