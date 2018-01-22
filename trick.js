'use strict'
/* global firebase, angular */
var config = {
  apiKey: 'AIzaSyD07mROu__kGOuJ-0MyjtjS6R5-DiTfUpM',
  authDomain: 'project-5641153190345267944.firebaseapp.com',
  databaseURL: 'https://project-5641153190345267944.firebaseio.com',
  projectId: 'project-5641153190345267944',
  storageBucket: 'project-5641153190345267944.appspot.com',
  messagingSenderId: '1048157266079'
}
firebase.initializeApp(config)

function toggleNav () {
  document.getElementsByClassName('topnav')[0].classList.toggle('responsive')
  document.getElementsByTagName('nav')[0].classList.toggle('responsive')
}

angular.module('trick', [
  'ngRoute',
  'trick.dash',
  'trick.details',
  'firebase'
])

  .config([
    '$locationProvider', '$routeProvider',
    function ($locationProvider, $routeProvider) {
      $locationProvider.html5Mode(true)
        .hashPrefix('!')

      $routeProvider.otherwise({
        redirectTo: '/'
      })
    }
  ])

  .factory('Auth', [
    '$firebaseAuth',
    function ($firebaseAuth) {
      return $firebaseAuth()
    }
  ])

  .factory('Db',
    function () {
      return firebase.database()
        .ref()
    })

  .run(function ($location, $rootScope, Auth, Db) {
    $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
      if (error === 'AUTH_REQUIRED') {
        $location.path('/')
        $rootScope.Error(
          'You need to be signed in to access this page, please Sign In and try again.'
        )
      }
    })

    $rootScope.signIn = function () {
      $rootScope.user = null
      $rootScope.Error('', false)
      Auth.$signInWithPopup('google')
        .then(function (firebaseUser) {
          $rootScope.user = firebaseUser
        })
        .catch(function (error) {
          $rootScope.Error(error)
        })
    }

    $rootScope.signOut = function () {
      Auth.$signOut()
    }

    $rootScope.goHome = function () {
      $location.path('/')
    }

    $rootScope.Error = function (e, bool) {
      $rootScope.error = {
        text: e,
        show: (bool == undefined ? true : bool)
      }
    }

    $rootScope.Subpage = function (name) {
      $rootScope.subpage = name
    }

    Auth.$onAuthStateChanged(function (firebaseUser) {
      $rootScope.user = firebaseUser
    })
  })

  .directive('ngConfirmClick', [
    function () {
      return {
        link: function (scope, element, attr) {
          var msg = attr.ngConfirmClick || 'Are you sure?'
          var clickAction = attr.confirmedClick
          element.bind('click', function (event) {
            if (window.confirm(msg)) {
              scope.$eval(clickAction)
            }
          })
        }
      }
    }
  ])
