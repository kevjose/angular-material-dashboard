/**
 * Created by AOT on 06-08-2015.
 */
angular
    .module('MuppetApp', ['ngMaterial', 'ui.router'])

    .run(['$rootScope', function ($rootScope) {
        $rootScope.title = "Food-Bowl";
    }])
    /*Ui router configuration*/
    .config(
    function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('landing-page', {
                url: "/landing-page",
                templateUrl: "views/landing-page.html",
                controller: 'LandingCtrl'
            })
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "../views/menu.html",
                controller: 'AppCtrl'
            })
            .state('app.overview', {
                url: "/",
                views: {
                    'menuContent': {
                        templateUrl: "../views/overview.html"
                    }
                }
            })
            .state('app.about', {
                url: "/about",
                views: {
                    'menuContent': {
                        templateUrl: "../views/about.html"
                    }
                }
            })

        ;

        $urlRouterProvider.otherwise("/landing-page");


    })
    /*Theming*/
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('deep-orange')
            .accentPalette('red')
            .warnPalette('blue-grey');
    })
    /*Landing page controller*/
    .controller('LandingCtrl', ['$scope', function ($scope) {

    }])
    /*Main application controller*/
    .controller('AppCtrl', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
        console.log("AppCtrl");
        $scope.cuisines = [
            'Indian',
            'Chinese'
        ];
        $scope.restaurants = [
            {
                name: "Dominos",
                imgurl: "http://static.in.groupon-content.net/64/68/1321011396864.jpg",
                menuContent: [
                    {
                        categoryName: "Regular (serves 1)",
                        food: [
                            {
                                name: "Margherita",
                                description: "A hugely popular margherita, with a deliciously tangy single cheese topping."
                            },
                            {
                                name: "Country Special",
                                description: "For all those with a partiality for veggies, this one's loaded - crunchy onions, crisp capsicum and fresh juicy tomatoes. Yum!"
                            }
                        ]
                    }, {
                        categoryName: "Medium (serves 2)",
                        food: [
                            {
                                name: "Chicken Salami Special",
                                description: "Who doesn't love some cheese and Salami? An all time winning combination of exotic, seasoned chicken salami and mouthwatering cheese. What's not to love right?"
                            },
                            {
                                name: "Peppy Paneer",
                                description: "Chunky paneer with crisp capsicum and spicy red pepper - quite a mouthful!"
                            }
                        ]
                    }, {
                        categoryName: "Large (serves 4)",
                        food: [
                            {
                                name: "Mexican Green Wave",
                                description: "A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs"
                            },
                            {
                                name: "Bbq Chicken ",
                                description: "A flavour of barbeque chicken spiked with onions"
                            }
                        ]
                    }
                ]
            }
        ]
        $scope.click = function () {
            console.log("Clicked");
        }
        $scope.toggleSidenav = toggleSidenav;

        function toggleSidenav(name) {
            $mdSidenav(name).toggle();
        }
    }])
    .directive('googleplace', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, model) {
                var options = {
                    types: [],
                    componentRestrictions: {}
                };
                scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

                google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                    scope.$apply(function () {
                        model.$setViewValue(element.val());
                    });
                });
            }
        };
    });
;
