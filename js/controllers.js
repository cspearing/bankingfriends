'use strict';

/* Controllers */

var bankFriendsControllers = angular.module('bankFriendsControllers', []);

bankFriendsControllers.controller('bankFriendsCtrl', ['$scope', '$filter', 'FriendsService','client',
  function($scope, $filter, FriendsService, client) {
    
    client.search({
        index: 'people',
        type: 'person',
        q: 'gender:male',
        searchType: 'query_and_fetch'
      }, function (error, response) {
      		if (error) {
			    		console	.error(JSON.stringify(error));
			    	
			  		} else {
			    		console.log('response: ' + JSON.stringify(response));	
			    		 $scope.friends = response.hits.hits;
			  		} 


            // ...
    //$scope.orderProp = 'age';
	});


    var orderBy = $filter('orderBy');
    $scope.order = function(predicate, reverse) {
      $scope.friends = orderBy($scope.friends, predicate, reverse);
    };
  //  $scope.order('-age',false);
      $scope.insert =function(){
      	$scope.friends.forEach(function(entry) {
        	console.log( JSON.stringify(entry));
		});	
      };
      
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

      $scope.create = function(){
      	var errored = false;
			$scope.friends.forEach(function(entry) {
				if (errored)
				{
					return;

				}
				entry.id = null,
	      		client.index({
		      		index: 'people',
		      		type: 'person',
		      		body : JSON.stringify(entry)
			    },function (error,response) {
			  		if (error) {
			    		console	.error(error);
			    		errored = true;
			  		} else {
			    		console.log('response: ' + JSON.stringify(response));	
			  		} 
			 	}); //end error func //end index 
	     	}); //endforeach
   		}; //end create
     
  }]); //end controller
