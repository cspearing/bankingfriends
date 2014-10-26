bankFriendsControllers.controller('bankFriendCtrl', ['$scope', '$routeParams', '$filter','client',
  function($scope, $routeParams, $filter, client) {
    //request the specific person
    client.get({
        index: 'people',
        type: 'person',
        id: $routeParams.friendId
      }, function (error, response) {
      		if (error) {
			    		console	.error(JSON.stringify(error));			    	
			  		} else {
              //diagnostic - see the response as a string
			    		//console.log('response: ' + JSON.stringify(response));	
			    		$scope.friend = response;
			  		} 
	}); //end function
}]); //end controller
