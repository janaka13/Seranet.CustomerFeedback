//To authenticate to form.Runs on Validate.html template
app.generateForm.controller('validateCtrl', function ($scope, $timeout, $http) {

    var logger = app.logger;

    $scope.validateAppraisal = function () {
        //$scope.temp.templateT = { name: 'loading.html', url: 'GenerateForm/templates/loading.html' };
        var validateKey = { appId: getURLParameter("app_id"), validateKey: $scope.validateKey };
        $http({
            method: 'POST',
            url: 'api/validateAppraisal',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(validateKey),
            async: false
        }).
        success(function (data, status, headers, config) {
            if (data[1] === "1") {
                logger.success("Validation successfull");
                $scope.temp.templateT = { name: 'formBody.html', url: 'GenerateForm/templates/formBody.html' };
            }
            else {
                logger.error("Validation failedd");
            }
        }).
        error(function (data, status, headers, config) {
            logger.error("Validation failed");
        });

    }

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }

});