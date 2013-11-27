'use strict';

/* Controllers */

function MainCtrl($scope, $http, angularFire, angularFireAuth) {
	$scope.loginBusy = false;
	$scope.userData = $scope.userData || {};

	var ref = new Firebase('https://[your-firebase].firebaseio.com/');
	angularFireAuth.initialize(ref, {scope: $scope, name: 'user'});

	/*//////////////LOGIN - LOGOUT - REGISTER////////////////////*/
	
	$scope.login = function() {
		$scope.loginMessage = "";
		if ((angular.isDefined($scope.inputEmail) && $scope.inputEmail != "") && (angular.isDefined($scope.inputPassword) && $scope.inputPassword != "")) {
			$scope.loginBusy = true;
			angularFireAuth.login('password', {
				email: $scope.inputEmail,
				password: $scope.inputPassword
			});
		} else {
			$scope.loginMessage = "Please enter a username and password!";
		}
	};
	
	$scope.logout = function() {
		$scope.loginBusy = true;
		$scope.loginMessage = "";
		$scope.greeting = "";
		$scope.disassociateUserData();
		$scope.userData = {};
		angularFireAuth.logout();
	};

	$scope.register = function() {
		$scope.loginMessage = "";
		if ((angular.isDefined($scope.inputEmail) && $scope.inputEmail != "") && (angular.isDefined($scope.inputPassword) && $scope.inputPassword != "")) {
			$scope.loginBusy = true;
			angularFireAuth.createUser($scope.inputEmail, $scope.inputPassword, function(err, user) {
				if (user) {
					console.log('New User Registered');
				}
				$scope.loginBusy = false;
			});
		} else	{
			$scope.loginMessage = "Please enter a username and password!";
		}
	};
	
	$scope.$on('angularFireAuth:login', function(evt, user) {
		$scope.loginBusy = false;
		$scope.user = user;
		console.log("User is Logged In");
		angularFire(ref.child('users/' + $scope.user.id), $scope, 'userData').then(function(disassociate) {
			$scope.userData.name = $scope.userData.name || {};
			if (!$scope.userData.name.first) {
				$scope.greeting = "Hello!";
			} else {
				$scope.greeting = "Hello, " + $scope.userData.name.first + "!";
			}
			$scope.disassociateUserData = function() {
				disassociate();
			};
		});
	});
	
	$scope.$on('angularFireAuth:logout', function(evt) {
		$scope.loginBusy = false;
		$scope.user = {};
		console.log('User is Logged Out');
	});
	
	$scope.$on('angularFireAuth:error', function(evt, err) {
		$scope.greeting = "";
		$scope.loginBusy = false;
		$scope.loginMessage = "";
		console.log('Error: ' + err.code);
		switch(err.code) {
			case 'EMAIL_TAKEN':
				$scope.loginMessage = "That email address is already registered!";
				break;
			case 'INVALID_PASSWORD':
				$scope.loginMessage = "Invalid username + password";
		}
	});
}