(function() {
    angular.module('Sharm')
        .factory('commentService', commentService);

    function commentService($http) {
        return {
            findCommentsByThread: findCommentsByThread,
            postComment: postComment,
            removeComment: removeComment
        };

        function findCommentsByThread(thread, limit, offset) {
            var url = '/project/rest/comment/' + thread;
            if (limit)
                url += '?limit=' + limit;
            if (offset) {
                if(limit) url += '&';
                else url += '?';
                url += 'offset=' + offset;
            }
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                })
        }

        function postComment(thread, content) {
            console.log('reached');
            return $http.post('/project/rest/comment/' + thread, {
                content: content
            });
        }

        function removeComment(commentId) {
            return $http.delete('/project/rest/comment/' + commentId);
        }
    }
})();