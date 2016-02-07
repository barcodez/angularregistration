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

	var myObject = {
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
		},  //login

		logout: function() {
			$rootScope.currentUser = '';
			$rootScope.message = '';
			return auth.$unauth();
		},  // logout

		requireAuth: function() {
			return auth.$requireAuth();
		},  // requireAuth

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

				myObject.login(user);
			}).catch(function(errorInfo){
				$rootScope.message = errorInfo.message;
			}); // createUser
		} // register
	};

	return myObject;
}]); // END factory
