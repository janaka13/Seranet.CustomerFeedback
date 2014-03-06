'use strict';
var app = {};

app.appfeedback = angular.module("appFeedback", ['ngRoute']);

app.appfeedback.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'Home/ViewForm/template/viewForm.html',
        controller: 'ViewController'
    });
    $routeProvider.when('/requests', {
        templateUrl: 'Home/RequestForm/template/requestForm.html',
        controller: 'RequestController'
    });
}]);
