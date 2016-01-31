myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', 'FIREBASE_URL'
	function($rootScope, $firebaseAuth, FIREBASE_URL) {

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);

	return {
		login: function(user) {
			$rootScope.message = "Welcome " + $rootScope.user.email;
		}, //login

		register: function(user) {
			auth.$createUser({
				email: user.email,
				password: user.password
			}).then(function(regUser){
				$rootScope.message = "Hi " + user.firstname + ", thanks for registering.";
			}).catch(function(errorInfo){
				$rootScope.message = errorInfo.message;
			}); // createUser
		} // register
	};

}]); // END factory
