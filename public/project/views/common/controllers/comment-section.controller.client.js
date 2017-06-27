(function() {
    angular.module('Sharm')
        .controller('commentSectionController', commentSectionController);

    function commentSectionController(userService, commentService, $scope) {
        var model = this;

        model.postComment = postComment;
        model.removeComment = removeComment;

        model.login = login;

        userService.getCurrentUser()
            .then(function(user) {
                model.currentUser = user;
            });

        model.thread = {};
        model.thread.uri = $scope.thread;

        refreshThread();

        function refreshThread() {
            commentService.findCommentsByThread(model.thread.uri)
                .then(function(data) {
                    model.thread.comments = data;
                });
        }

        function postComment(content) {
            if (typeof content === 'undefined')
                return;
            commentService.postComment(model.thread.uri, content)
                .then(function(response) {
                    if (response.data === 'Not logged in')
                        login();
                    else {
                        model.content = '';
                        refreshThread();
                    }
                });
        }

        function removeComment(commentId) {
            commentService.removeComment(commentId)
                .then(function(response) {
                    refreshThread();
                });
        }

        function login() {
            $('#loginModal').modal();
        }
    }
})();