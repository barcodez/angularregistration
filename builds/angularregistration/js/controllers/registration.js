myApp.controller('RegistrationController', 
	['$scope', 'Authentication',
	function($scope, Authentication){

	$scope.login = function() {
		Authentication.login($scope.user);
	}; // END login

	$scope.register = function() {
		Authentication.register($scope.user);
	}; // END register
}]); // END controller