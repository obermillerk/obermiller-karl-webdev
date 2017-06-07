(function() {
    angular
        .module("WebAppMaker")
        .config(configRoutes);

    function configRoutes($routeProvider) {
        var routes = [["default",
            "./views/user/templates/home.view.client.html"],
            ["/",
                "./views/user/templates/home.view.client.html"],
            ["/login",
                "./views/user/templates/login.view.client.html",
                "loginController"],
            ["/register",
                "./views/user/templates/register.view.client.html",
                "registerController"],
            ["/user/:uid",
                "./views/user/templates/profile.view.client.html",
                "profileController"],
            ["/user/:uid/website",
                "./views/website/templates/website-list.view.client.html",
                "websiteListController"],
            ["/user/:uid/website/new",
                "./views/website/templates/website-new.view.client.html",
                "websiteNewController"],
            ["/user/:uid/website/:wid",
                "./views/website/templates/website-edit.view.client.html",
                "websiteEditController"],
            ["/user/:uid/website/:wid/page",
                "./views/page/templates/page-list.view.client.html",
                "pageListController"],
            ["/user/:uid/website/:wid/page/new",
                "./views/page/templates/page-new.view.client.html",
                "pageNewController"],
            ["/user/:uid/website/:wid/page/:pid",
                "./views/page/templates/page-edit.view.client.html",
                "pageEditController"],
            ["/user/:uid/website/:wid/page/:pid/widget",
                "./views/widget/templates/widget-list.view.client.html",
                "widgetListController"],
            ["/user/:uid/website/:wid/page/:pid/widget/new",
                "./views/widget/templates/widget-choose.view.client.html",
                "widgetNewController"],
            ["/user/:uid/website/:wid/page/:pid/widget/:wgid",
                "./views/widget/templates/widget-edit.view.client.html",
                "widgetEditController"],
            ["/user/:uid/website/:wid/page/:pid/widget/:wgid/flickr",
                "./views/widget/templates/edit/widget-flickr-search.view.client.html",
                "widgetFlickrSearchController"]
        ];

        for (var r in routes) {
            var route = routes[r];
            $routeProvider.when(route[0], {
                templateUrl: route[1],
                controller: route[2],
                controllerAs: "model"
            });
        }

        $routeProvider.otherwise({
            redirectTo: "/"
        });
    }
})();