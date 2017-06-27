(function() {
    angular.module('Sharm')
        .factory('postService', postService);

    function postService($http) {
        return {
            findPostsByUsername: findPostsByUsername,
            post: post,
            removePost: removePost
        };

        function findPostsByUsername(username, limit, offset) {
            var url = '/project/rest/post/' + username;
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

        function post(username, content) {
            if (!content) {
                return;
            }
            return $http.post('/project/rest/post/' + username, {
                content: content
            });
        }

        function removePost(commentId) {
            return $http.delete('/project/rest/post/' + commentId);
        }
    }
})();