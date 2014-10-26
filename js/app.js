'use strict';

/* App Module */

var bankFriendsApp = angular.module('bankFriendsApp', [
  'ngRoute',
  //'phonecatAnimations',
  'bankFriendsControllers',
  'bankFriendsServices',
  'elasticsearch'
]);

bankFriendsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'bankFriendsCtrl'
      }),
    /*$routeProvider.
      when('/friend', {
        templateUrl: 'partials/friend.html',
        controller: 'bankFriendCtrl'
      }),*/
      otherwise({
        redirectTo: '/home'
      });
  }]);
