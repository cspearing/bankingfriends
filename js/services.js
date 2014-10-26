'use strict';

/* Services */

var bankFriendsServices = angular.module('bankFriendsServices',
   ['ngResource', 'elasticsearch']);



bankFriendsServices.service('client', function (esFactory) {
  return esFactory({
    host: 'localhost:9200',
    // ...
  });
});

bankFriendsServices.factory('FriendsService', ['client',
  function(client){
    /*return $resource('friends.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });*/
    return client.get({
        index: 'people',
        type: 'person'
      }, function (error, response) {
            // ...
    });


  }]);
/*

bankFriendsServices.factory('esService',[
	function(){
		var elasticsearch = require('elasticsearch');
		var client = new elasticsearch.Client({
		  host: 'localhost:9200',
		  log: 'trace'
		});

		return client;
	}]);*/
