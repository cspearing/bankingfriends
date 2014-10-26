'use strict';

/* Services */

var bankFriendsServices = angular.module('bankFriendsServices',
   ['ngResource', 'elasticsearch']);

//creates an elasticsearch JS api
bankFriendsServices.service('client', function (esFactory) {
  return esFactory({
    host: 'localhost:9200'
  });
});
