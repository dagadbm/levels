'use strict';
/**
 * @class trick.dash
 * @memberOf trick
 * @requires ngRoute
 */
angular.module('trick.dash', ['ngRoute'])

  .config([
    '$routeProvider',
  function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: '/dash/dash.html',
        controller: 'DashCtrl'
      });
    }
  ])

  .controller('DashCtrl', function($scope, $firebaseArray, $firebaseObject,
    $anchorScroll, $location, Db, Auth) {
    $scope.Subpage(undefined);
    Auth.$onAuthStateChanged(function() {
      if ($scope.user) {
        var trickRef = Db.child("tricks");
        $scope.data = $firebaseArray(trickRef);
        var verifierRef = Db.child("verifiers/" + $scope.user.uid)
        $scope.verifier = $firebaseObject(verifierRef);
      }
    });

    var anchor = $location.hash();
    $anchorScroll.yOffset = 200;
    setTimeout(function() {
      $anchorScroll()
    }, 100);

    $scope.class = function(id0, id1, verified, vLevel) {
      var x = "";
      x += (id0 + '' + id1 == anchor ? 'pop ' : '');
      if (verified && verified.vLevel >= vLevel) {
        x += 'done'
      }
      return x;
    }

  });
