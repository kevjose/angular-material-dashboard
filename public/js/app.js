/**
 * Created by AOT on 06-08-2015.
 */
angular
    .module('MuppetApp', ['ngMaterial', 'ui.router'])
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
            .accentPalette('brown')
            .warnPalette('blue-grey');
    })
    /*Landing page controller*/
    .controller('LandingCtrl', ['$scope', function ($scope) {

    }])
    /*Main application controller*/
    .controller('AppCtrl', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
        console.log("AppCtrl");
        $scope.toggleSidenav = toggleSidenav;

        function toggleSidenav(name) {
            $mdSidenav(name).toggle();
        }
    }])
    .directive('googleplace', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, model) {
                var options = {
                    types: [],
                    componentRestrictions: {}
                };
                scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

                google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                    scope.$apply(function() {
                        model.$setViewValue(element.val());
                    });
                });
            }
        };
    });;
