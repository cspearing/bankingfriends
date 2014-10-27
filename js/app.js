'use strict';

/* App Module - create our 'app' (as a module) 
 * depending on a whole bunch of other items that 
 * have been registered in other files
 */

var bankFriendsApp = angular.module('bankFriendsApp', [
  'ngRoute',
  'bankFriendsControllers',
  'bankFriendsServices',
  'elasticsearch',
  'ui.bootstrap',
  'ngCookies',
  'angular-loading-bar',
  'drag'
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
       when('/contact', {
        templateUrl: 'partials/contact.html'
      }).
      when('/friend/:friendId', {
        templateUrl: 'partials/friend.html',
        controller: 'bankFriendCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);

angular.module('drag', []).
  directive('draggable', function($document) {
    return function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;
      element.css({
       position: 'relative',
      
       cursor: 'pointer',
       display: 'block'
      });
      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.screenX - x;
        startY = event.screenY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      function mousemove(event) {
        y = event.screenY - startY;
        x = event.screenX - startX;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    };
  });