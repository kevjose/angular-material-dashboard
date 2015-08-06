/**
 * Created by AOT on 06-08-2015.
 */
var app = angular.module('MuppetApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$mdSidenav', 'muppetService', '$timeout', '$log', function ($scope, $mdSidenav, muppetService, $timeout, $log) {
    var allMuppets = [];

    $scope.selected = null;
    $scope.muppets = allMuppets;
    $scope.selectMuppet = selectMuppet;
    $scope.toggleSidenav = toggleSidenav;

    loadMuppets();

    //*******************
    // Internal Methods
    //*******************
    function loadMuppets() {
        muppetService.loadAll()
            .then(function (muppets) {
                allMuppets = muppets;
                $scope.muppets = [].concat(muppets);
                $scope.selected = $scope.muppets[0];
            });
    }

    function toggleSidenav(name) {
        $mdSidenav(name).toggle();
    }

    function selectMuppet(muppet) {
        $scope.selected = angular.isNumber(muppet) ? $scope.muppets[muppet] : muppet;
        $scope.toggleSidenav('left');
    }
}]);

app.service('muppetService', ['$q', function ($q) {
    var muppets = [{
        name: 'Animal',
        content: 'Animal is the wild and frenzied drummer of Dr. Teeth and The Electric Mayhem, the fictional band from The Muppet Show. He is one of the Muppets originally created by Michael K. Frith.Animal is the wild and frenzied drummer of Dr. Teeth and The Electric Mayhem, the fictional band from The Muppet Show. He is one of the Muppets originally created by Michael K. Frith.'
    }, {
        name: 'Fozzie Bear',
        content: 'Fozzie Bear is a Muppet character created by Jim Henson and developed by Frank Oz. Fozzie is an orange-brown, fozzie bear who often wears a brown pork pie hat and a red-and-white polka-dot necktie. The character debuted on The Muppet Show, as the show\'s stand-up comic, a role where he constantly employed his catchphrase, "Wocka Wocka Wocka!". Shortly after telling the joke, he was usually the target of ridicule, particularly from balcony hecklers Statler and Waldorf.'
    }, {
        name: 'The Swedish Chef',
        content: 'The Swedish Chef is a Muppet character that appeared on The Muppet Show. He was originally performed by Jim Henson and Frank Oz simultaneously, with Henson performing the head and voice and Oz performing the character\'s live hands. The Swedish Chef is now performed by Bill Barretta.'
    }, {
        name: 'Cookie Monster',
        content: 'Cookie Monster is a Muppet on the long running children\'s television show Sesame Street. He is best known for his voracious appetite and his famous eating phrases: "Me want cookie!", "Me eat cookie!", and "Om nom nom nom" (said through a mouth full of food). He often eats anything and everything, including danishes, donuts, lettuce, apples, bananas, as well as normally inedible objects. However, as his name suggests, his preferred food is cookies. Chocolate chip cookies are his favorite kind; oatmeal cookies are his second favorite.'
    }];

    // Promise-based API
    return {
        loadAll: function () {
            // Simulate async nature of real remote calls
            return $q.when(muppets);
        }
    };
}]);