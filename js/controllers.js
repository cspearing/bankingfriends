'use strict';

/* Controllers */
var bankFriendsControllers = angular.module('bankFriendsControllers', []);
bankFriendsControllers.controller("navCtrl", [
	function(){

}]);

//setup the bankFriendsCtrl controller (the homepage one)
bankFriendsControllers.controller('bankFriendsCtrl', ['$scope', '$filter', 'client',
  function($scope, $filter, client) {
  	//search the index for all males
    client.search({
        index: 'people',
        type: 'person',
        //this is the standard ES search api
        body:
        {
          "query" : {
          "match_all" : {}
        }},
        size: 50
      }, function (error, response) {
      	if (error) {
			console	.error(JSON.stringify(error));
		} else {
			console.log('response: ' + JSON.stringify(response));	
			$scope.friends = response.hits.hits;
      $scope.results = response.hits.total;
		} 
	});
    //get the orderby function from the filter
    var orderBy = $filter('orderBy');
    var predicate = "";
    var reverse = false;
    //create an ordering function, attach to the scope
    $scope.order = function(pred, rev) {
      predicate = pred;
      reverse = rev;
      $scope.friends = orderBy($scope.friends, predicate, reverse);
    };
    //create an jsonify function (this will log all objects as json strings)
     $scope.jsonify =function(){
   		$scope.friends.forEach(function(entry) {
        console.log( JSON.stringify(entry));
		});	
      };
      
      //create a ping function to contact the ES server
      $scope.ping = function(){
      	client.ping({
  			requestTimeout: 1000,
  			// undocumented params are appended to the query string
  			hello: "elasticsearch!"
		}, function (error) {
  			if (error) {
    			console	.error('elasticsearch cluster is down!');
  			} else {
    			console.log('All is well');
  		}
		});
      };
      $scope.search = function(query){
        client.search({
        index: 'people',
        type: 'person',
        //this is the standard ES search api
        q: query,
        size: 50
      }, function (error, response) {
        if (error) {
      console .error(JSON.stringify(error));
    } else {
      console.log('response: ' + JSON.stringify(response)); 
      $scope.friends = orderBy(response.hits.hits, predicate, reverse);
      $scope.results = response.hits.total;
    } 
  });
      };

      //create function - to take the current items in scope and insert into
      //the ES database
      $scope.create = function(){
      	var errored = false;
			$scope.friends.forEach(function(entry) {
				if (errored) {
					return;
				}
				entry.id = null,
	      		client.index({
		      		index: 'people',
		      		type: 'person',
		      		body : JSON.stringify(entry)
			    },function (error,response) {
			  		if (error) {
			    		console.error(error);
			    		errored = true;
			  		} else {
			    		console.log('response: ' + JSON.stringify(response));	
			  		} 
			 	}); //end error func //end index 
	     	}); //endforeach
   		}; //end create
     
  }]); //end controller
