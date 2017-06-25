(function() {
    angular.module('Sharm')
        .directive('navSearch', navSearch);

    function navSearch() {
        return {
            link: linkFunction
        };
        function linkFunction(scope, element) {
            element = $(element);
            var searchInput = element.find('#search-input');
            element.focusin(function() {
                    var width = $(window).width();
                    var w = '200px';
                    if (width < 500)
                        w = '100px';
                    searchInput.finish().animate({width: w}, 500);
            });
            element.focusout(function() {
                setTimeout(function () {
                    if (element.has(document.activeElement).length === 0
                            && !searchInput.val()) {
                        searchInput.finish().animate({width: '10px'}, 500);
                    }
                });
            });
        }
    }
})();