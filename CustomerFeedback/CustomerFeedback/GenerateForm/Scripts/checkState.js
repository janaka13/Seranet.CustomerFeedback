//The is the super controller with super scope(Parent scope).
app.generateForm.controller('mainFormPage', function ($scope, $timeout, $http) {

    var logger = app.logger;

    $scope.temp = {};
    $scope.temp.templateT = {};//To keep track the url which loads to the main div
    $scope.temp.AppraisalState = null;


    $scope.checkAppraisalState = function () {
        $scope.temp.templateT = { name: 'loading.html', url: 'GenerateForm/templates/loading.html' };
        var appId = { appId: getURLParameter("app_id") };

        $http({
            method: 'POST',
            url: 'api/CheckStatus',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(appId),
            async: false,
        }).
        success(function (data, status, headers, config) {
            $scope.temp.AppraisalState = data[1];
            if (data[1] === "1" || data[1] === "2") {
                $scope.temp.templateT = { name: 'Validate.html', url: 'GenerateForm/templates/Validate.html' };
            }
            else {
                logger.error("Invalid Url");
                $scope.temp.templateT = { name: 'validateFailed.html', url: 'GenerateForm/templates/validateFailed.html' };
            }

        }).
        error(function (data, status, headers, config) {
            logger.error("Validation Failed");
        });

    }

    //extracting url parameters
    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }



});