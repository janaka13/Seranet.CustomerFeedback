'use strict';
var app = {};

app.appfeedback = angular.module("appFeedback", ['ngRoute']);

app.appfeedback.config(['$routeProvider', function ($routeProvider) {

    $.ajax({
        type: 'POST',
        url: 'api/CheckLogginStatus',
        contentType: 'application/json;charset=utf-8',
        async: false,
        success: function (data) {
            if (data == "0") {
                logger.error("you are not logged in.");
                window.location.assign("./Login.html");
            }
        }
    });

    $routeProvider.when('/', {
        templateUrl: 'Home/ViewForm/template/viewForm.html',
        controller: 'ViewController',
    });
    $routeProvider.when('/requests', {
        templateUrl: 'Home/RequestForm/template/requestForm.html',
        controller: 'RequestController',
    });
}]);
