app.applogin.controller('LoginController', function ($scope, $timeout, $http) {
    var logger = app.logger;
    $scope.login = function () {
        var user = { userName: $scope.usernameText, password: $scope.passwordText, userType: 1 };
        $http({
            method: 'POST',
            url: 'api/CheckLogin',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(user),
            async: false,
        }).
        success(function (data, status, headers, config) {
            
            if (data[1] === "1") {
                logger.success("Validation Success");
                window.location.assign("./Home.html");
            }
            else {
                logger.error("Validation failed");
            }
            
            
        }).
        error(function (data, status, headers, config) {
            
        });

    };

    $('input[type="text"]').keypress(function (e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
            $scope.login();
        }
    });


    $('input[type="password"]').keypress(function (e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
            $scope.login();
        }
    });

});
