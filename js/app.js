'use strict';

/* App Module - create our 'app' (as a module) 
 * depending on a whole bunch of other items that 
 * have been registered in other files
 */

var bankFriendsApp = angular.module('bankFriendsApp', [
  'ngRoute',
  'bankFriendsControllers',
  'bankFriendsServices',
  'elasticsearch'
]);

//configure the routing
bankFriendsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'bankFriendsCtrl'
      }).
       when('/about', {
        templateUrl: 'partials/about.html'
      }).
      when('/friend/:friendId', {
        templateUrl: 'partials/friend.html',
        controller: 'bankFriendCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
