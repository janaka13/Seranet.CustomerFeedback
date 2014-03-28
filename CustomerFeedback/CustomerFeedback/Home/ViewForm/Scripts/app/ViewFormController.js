app.appfeedback.controller('ViewController', function ($scope, $timeout, $http) {

    var instance = breeze.config.initializeAdapterInstance("ajax", "angular", true);
    var dataservice = app.ViewFormDataservice;
    var dataserviceAppraisal = app.ViewFormDataserviceAppraisal;
    var logger = app.logger;

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

    $scope.appraisals = [];

    $scope.groupedItems = [];
    $scope.itemsPerPage = 15;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.allPages = 0;

    $scope.selection = "all";
    $scope.currentEvaluations = [];
    $scope.currentAppraisal;

    $scope.Ratings = [];

    $scope.loading = "no";

    $scope.search = function () {
        $scope.loading = "yes";
        $scope.$apply();
        $scope.currentPage = 0;
        //logger.info("Loading data");
        $scope.appraisals = [];
        $scope.pagedItems = [];
        fillTable();
    };
    
    fillTable = function () {
        $scope.loading = "yes";
        $scope.$apply();
        var projContains = "";
        if ($scope.projectText != null && $scope.projectText != "")
            projContains = $scope.projectText;
        
        getFilteredApps(projContains, $scope.itemsPerPage, $scope.currentPage);
        $scope.selection = "all";
        $scope.Ratings = [];
    }

    getFilteredApps = function (project, pageSize, pageSkip) {
        dataserviceAppraisal.getAppsFiltered(project, pageSize, pageSkip)
            .then(querySucceeded)
            .fail(queryFailed);

        function querySucceeded(data) {
            $scope.appraisals = [];
            for (i = 0; i < data.results.length; i++) {
                $scope.appraisals.push({
                    appraisal_id: data.results[i].appraisal_id,
                    project: data.results[i].project_name,
                    year: data.results[i].appraisal_year,
                    type: (data.results[i].appraisal_type == "mid") ? "Y/M" : "Y/E",
                    customer: data.results[i].customermail,
                    status: data.results[i].appraisal_status,
                    is_viewed: data.results[i].is_viewed
                });
            }

            $scope.allPages = Math.floor(data.inlineCount / $scope.itemsPerPage) + (data.inlineCount % $scope.itemsPerPage > 0 ? 1 : 0);

            if (data.results.length == 0) {
                logger.warning("No results found");
            }

            $scope.groupToPages();

            $scope.loading = "no";
            $scope.$apply();

            //$scope.color();
        }

        function queryFailed(error) {
            logger.error(error, "Error while retrieving data from database");
        }
    };

    $scope.color = function () {

        var table = document.getElementById("viewTable");
        for (var i = 1; i <= $scope.appraisals.length ; i++) {
            row = table.rows[i];
            if ($scope.appraisals[i - 1].is_viewed == 0 && $scope.appraisals[i - 1].status == 0)    //submitted but not viewed
                row.style.backgroundColor = "#F5EFB5";
            else if($scope.appraisals[i - 1].is_viewed == 1 && $scope.appraisals[i - 1].status == 0)    //submitted and viewed
                row.style.backgroundColor = "#D0F2D3";
            else if($scope.appraisals[i - 1].status == 1)    //not submitted
                row.style.backgroundColor = "#F5D5E0";
        }
    }

    $scope.viewApp = function (appraisalID, status) {
        
        $scope.Ratings = [];
        $scope.Totals = [];

        if (parseInt(status) == 1 || parseInt(status) == 2) {
            logger.warning("Not yet submitted");
        }

        else {
            $scope.loading = "yes";
            $scope.$apply();

            dataservice.getAppraisalData(appraisalID)
            .then(function (data) {
                $scope.currentAppraisal = data.results[0];
                $scope.$apply();
                //logger.info("Got Appraisal Data");

                dataservice.getEvaluationData(appraisalID)
                .then(function (data) {
                    $scope.currentEvaluations = data.results;
                    $scope.$apply();
                    //logger.info("Got Evaluation Data");

                    tempEmp = [];

                    for (j = 0; j < $scope.currentEvaluations.length; j++) {
                        tempEmp.push({
                            name: $scope.currentEvaluations[j].employee_name,
                            rate: ""
                        });
                        $scope.Totals.push({
                            name: $scope.currentEvaluations[j].employee_name,
                            total: 0
                        });
                    }

                    for (i = 0; i < $scope.currentAppraisal.template.templateStructures.length; i++) {
                        tempEmpList = [];

                        for (j = 0; j < $scope.currentEvaluations.length; j++) {
                            tempEmpList.push({
                                name: $scope.currentEvaluations[j].employee_name,
                                rate: ""
                            });
                        }

                        $scope.Ratings.push({
                            criteria: $scope.currentAppraisal.template.templateStructures[i].criteria.criteria_caption,
                            emplist: tempEmpList
                        });
                    }

                    for (i = 0; i < $scope.currentAppraisal.template.templateStructures.length; i++) {
                        tempRates = [];
                        tempComments = [];
                        for (j = 0; j < $scope.currentEvaluations.length; j++) {
                            if ($scope.currentAppraisal.template.templateStructures[i].criteria.criteria_type == 1) {
                                dataservice.getRatingData($scope.currentEvaluations[j].evaluation_id,
                                    $scope.currentAppraisal.template.templateStructures[i].criteria.criteria_id, i, j)
                                    .then(function (data) {
                                        for (k = 0; k < $scope.Ratings.length; k++) {
                                            if ($scope.Ratings[k].criteria == data.results[0].criteria.criteria_caption) {
                                                for (l = 0; l < tempEmp.length; l++) {
                                                    if ($scope.Ratings[k].emplist[l].name == data.results[0].evaluation.employee_name) {
                                                        $scope.Ratings[k].emplist[l].rate = data.results[0].rating;
                                                        $scope.Totals[l].total += data.results[0].rating;
                                                        if (data.results[0].comments != null) {
                                                            $scope.Ratings[k].emplist[l].additional = data.results[0].comments;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        $scope.$apply();
                                    })
                                    .fail(function (error) {
                                        logger.error(error, "Error occured when fetching rating data");
                                    });


                            }
                            else if ($scope.currentAppraisal.template.templateStructures[i].criteria.criteria_type == 2) {
                                dataservice.getRatingData($scope.currentEvaluations[j].evaluation_id,
                                    $scope.currentAppraisal.template.templateStructures[i].criteria.criteria_id, i, j)
                                    .then(function (data) {
                                        for (k = 0; k < $scope.Ratings.length; k++) {
                                            if ($scope.Ratings[k].criteria == data.results[0].criteria.criteria_caption) {
                                                for (l = 0; l < tempEmp.length; l++) {
                                                    if ($scope.Ratings[k].emplist[l].name == data.results[0].evaluation.employee_name) {
                                                        $scope.Ratings[k].emplist[l].rate = data.results[0].comments;
                                                    }
                                                }
                                            }
                                        }
                                        $scope.$apply();
                                    })
                                    .fail(function (error) {
                                        logger.error(error, "Error occured when fetching rating data");
                                    });
                            }
                        }
                    }
                    $scope.selection = "selected";
                    $scope.loading = "no";
                    $scope.$apply();
                    dataservice.setViewAppraisal(appraisalID);
                    //Modify View
                })
                .fail(function (data) {
                    logger.error(data, "Error occured when fetching evaluation data");
                });

            })
            .fail(function (data) {
                logger.error(data, "Error occured when fetching appraisal data");
            });
        }
    };


    $scope.groupToPages = function () {

        for (var i = 0; i < $scope.appraisals.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[$scope.currentPage] = [$scope.appraisals[i]];
            } else {
                $scope.pagedItems[$scope.currentPage].push($scope.appraisals[i]);
            }
        }
    };

    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
            if ($scope.pagedItems[$scope.currentPage].length == null) {
                fillTable();
            }
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.allPages - 1) {
            $scope.currentPage++;
            if ($scope.pagedItems[$scope.currentPage] == null) {
                fillTable();
            }
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
        if ($scope.pagedItems[$scope.currentPage] == null) {
            fillTable();
        }
    };

    $scope.backToList = function () {
        $scope.selection = "all";
        $scope.Ratings = [];
    };
    
}
);
