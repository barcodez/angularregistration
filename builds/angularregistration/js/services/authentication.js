myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', '$firebaseObject', '$location', 'FIREBASE_URL',
	function($rootScope, $firebaseAuth, $firebaseObject, $location, FIREBASE_URL) {

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);

	auth.$onAuth(function(authUser) {
		if(authUser) {
			var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
			var userObj = $firebaseObject(userRef);
			$rootScope.currentUser = userObj;
		} else {
			$routeScope.currentUser = '';
		}
	});

	return {
		login: function(user) {
			$rootScope.message = "Welcome " + user.email;
			auth.$authWithPassword({
				email: user.email,
				password: user.password
			}).then(function(regUser){
				$location.path("/success");
			}).catch(function(errorInfo){
				$rootScope.message = errorInfo.message;	
			});
		}, //login

		logout: function() {
			return auth.$unauth();
		}, // logout

		register: function(user) {
			auth.$createUser({
				email: user.email,
				password: user.password
			}).then(function(regUser){
				var regRef = new Firebase(FIREBASE_URL + 'users')
				.child(regUser.uid).set({
					date: Firebase.ServerValue.TIMESTAMP,
					regUser: regUser.uid,
					firstname: user.firstname,
					lastname: user.lastname,
					email: user.email
				}); // user info
				$rootScope.message = "Hi " + user.firstname + ", thanks for registering.";
			}).catch(function(errorInfo){
				$rootScope.message = errorInfo.message;
			}); // createUser
		} // register
	};

}]); // END factory
