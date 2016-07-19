'use strict';

/* App Module */

var kirbroApp = angular.module('kirbroApp', [
  'ngRoute',
  'ngTouch',
  'kirbroAppCtrl',
]);

kirbroApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'tmp/home.html',
        controller: 'HomeCtrl'
      }).
      when('/cost', {
        templateUrl: 'tmp/cost.html',
        controller: 'CostCtrl'
      }).
      when('/track', {
        templateUrl: 'tmp/track.html',
        controller: 'TrackCtrl'
      }).
      when('/venues/:courier', {
        templateUrl: 'tmp/venues.html',
        controller: 'VenuesCtrl'
      }).
      when('/venue/:venueid', {
        templateUrl: 'tmp/venue.html',
        controller: 'VenueCtrl'
      }).
      when('/findcourier', {
        templateUrl: 'tmp/findcourier.html',
        controller: 'CourierCtrl'
      }).
      when('/faq', {
        templateUrl: 'tmp/faq.html',
        controller: 'FAQCtrl'
      }).
      when('/pat', {
        templateUrl: 'tmp/pat.html',
        controller: 'PATCtrl'
      }).
      when('/copyright', {
        templateUrl: 'tmp/copyright.html',
        controller: 'CopyrightCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);