bankFriendsControllers.controller('bankFriendCtrl', ['$scope', '$routeParams', '$filter','client','$cookies',
  function($scope, $routeParams, $filter, client, $cookies) {

  $scope.$watch("addressCollapsed", function() { 
    $cookies.addressCollapsed = $scope.addressCollapsed
  }, true);  

  $scope.addressCollapsed = ($cookies.addressCollapsed === 'true' ); //false if cookie not set to true 


  $scope.$watch("detailsCollapsed", function() { 
    $cookies.detailsCollapsed = $scope.detailsCollapsed
  }, true);  

  $scope.detailsCollapsed = ($cookies.detailsCollapsed === 'true' ); //false if cookie not set to true 

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
