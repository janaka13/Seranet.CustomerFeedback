
app.appfeedback.controller('RequestController', function ($scope, $timeout, $http) {

    var instance = breeze.config.initializeAdapterInstance("ajax", "angular", true);
    var dataserviceEvaluationRequests = app.RequestFormDataserviceEvaluation;
    var dataserviceRequests = app.RequestFormDataservice;
    var dataserviceAppraisalRequests = app.RequestFormDataserviceAppraisal;
    var logger = app.logger;
    var feedBackExternalUrl = "http://feedback.99xtechnology.com";

    $.ajax({
        type: 'POST',
        url: 'api/CheckLogginStatus',
        contentType: 'application/json;charset=utf-8',
        async: false,
        success: function (data) {
            if (data == "0") {
                logger.error("You are not Logged in");
                window.location.assign("./Login.html");
            }
        }
    });


    $scope.projects = [];

    $scope.employeesNames = [];

    $scope.customerMails = [];

    $scope.mailstoSend = [];
    $scope.appraisalToSend = "";

    $scope.selectetProject = "";
    $scope.selectedDuration = "";

    $scope.mailText = "Please spend some time to fill this appraisal";

    $scope.appraisalToSave;
    $scope.evaluationToSave;

    $scope.allEmployees = [];

    $scope.durations = [
        { durationType: 'Year End' },
        { durationType: 'Mid Year' }];

    
    employeeURL = "http://99xt.lk/services/api/employees";
    projectURL = "http://99xt.lk/services/api/Projects";
    customerURL = "http://99xt.lk/services/api/Contacts";

    //called when the add button clicked to add new employee
    $scope.addEmployees = function () {

        if ($scope.employeeText != null && $scope.employeeText != "") {

            //check whether employee is already added to the list of employees of the project
            for(i=0; i< $scope.employeesNames.length;i++)
            {
                if ($scope.employeesNames[i].employeename.toLowerCase() == $scope.employeeText.toLowerCase())
                {
                    logger.warning("Already Added");
                    return;
                }
            }

            //check whether there is no such employee in the company
            for (i = 0; i < $scope.allEmployees.length; i++) {
                if ($scope.allEmployees[i].toLowerCase() == $scope.employeeText.toLowerCase()) {
                    break;
                }

                if (i == ($scope.allEmployees.length - 1)) {
                    logger.warning("No Such Employee");
                    return;
                }
            }
            
            //add employee details to the list of employees of the project
            var first, last, full;

            $.ajax({
                url: employeeURL,
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },

                success: function (data) {
                    for (var i = 0, len = data.length; i < len; i++) {

                        first = data[i].firstName;
                        last = data[i].lastName;
                        full = first + " " + last;

                        if (full.toLowerCase() == $scope.employeeText.toLowerCase()) {
                            $scope.employeesNames.push({ employeename: $scope.employeeText.toProperCase(), employeeid: data[i].id });
                            $scope.employeeText = '';
                            $scope.$apply();
                        }

                    };

                }
            });

        }
    };


    //called when the add button clicked to add new customer mail
    $scope.addCustomers = function () {

        if ($scope.customerText != null && $scope.customerText != "") {

            //check whether mail is already added to the listof customer mails
            for (i = 0; i < $scope.customerMails.length; i++) {
                if ($scope.customerMails[i].customermail.toLowerCase() == $scope.customerText.toLowerCase()) {
                    logger.warning("Already Added");
                    return;
                }
            }

            $scope.customerMails.push({ customername: "", customermail: $scope.customerText });
            $scope.customerText = '';

        }
    };


    //calls when the submit button clicked
    $scope.submit = function () {
        block();
        dataserviceRequests.clear();
        var warning = $scope.validate();
        if (warning != "") {
            unblock();
            logger.warning(warning);
        }            
        //if no validation errors save data to database and send mails
        else {
            saveAppraisals();
        }
    };

    //validating the form
    $scope.validate = function () {
        var warning = "";

        if($scope.selectetProject=="")
            warning = "Select a Project First";

        else if ($scope.projects.length == 0)
            warning = "Select a Project First";

        else if ($scope.yearText == null || $scope.yearText == "")
            warning = "Enter an Year";

        else if (isNaN($scope.yearText) || $scope.yearText % 1 !=0)
            warning = "Enter a Valid year";

        else if ($scope.selectedDuration == "")
            warning = "Select the Appraisal Type";

        else if ($scope.employeesNames.length == 0)
            warning = "Select an Employee in the Project";

        else if ($scope.customerMails.length == 0)
            warning = "Select a Customer of the Project";

        return warning;
    }
    
    saveAppraisals = function () {

        //get top id of appraisals
        return dataserviceAppraisalRequests.getTop()
            .then(querySucceeded)
            .fail(queryFailed);

        function querySucceeded(data) {

            if (data.results.length == 0) {
                $scope.appraisalToSave = 1;
            }
            else {
                $scope.appraisalToSave = data.results[0].appraisal_id + 1;
            }
            $scope.mailstoSend = [];

            //for each customer create appraisals
            for (i = 0; i < $scope.customerMails.length; i++) {
                //generate validation key
                var val_key = Math.random().toString(36).slice(2);
                addAppraisal($scope.customerMails[i].customermail, val_key, ($scope.appraisalToSave + i));
            }

            //call function to save evaluations
            saveEvaluations();
        }

        function queryFailed(error) {
            unblock();
            logger.error(error, "Error Occured in Saving");
        }
    };

    
    addAppraisal = function (email, val_key, id) {
        dataserviceRequests.getHash(val_key)
            .then(hashSucceeded)
            .fail(hashFailed);
        function hashSucceeded(data) {
            dataserviceRequests.createAppraisal({
                appraisal_id: (id),
                template_id: 1,
                project_name: $scope.selectetProject,
                appraisal_year: $scope.yearText,
                appraisal_type: $scope.selectedDuration,
                appraisal_status: "1",
                customermail: email,
                validate_key: data.results[0].substring(1 , data.results[0].length - 1)
            });
            //logger.info("Created Appraisal: " + id);
            $scope.mailstoSend.push({ appraisal_id: id, customermail: email, validate_key: val_key, year: $scope.yearText, type: $scope.selectedDuration, project: $scope.selectetProject });
        }
        function hashFailed(error){
            unblock();
        }
    };


    saveEvaluations = function () {

        //get top evaluation id
        return dataserviceEvaluationRequests.getTop()
        .then(querySucceeded)
        .fail(queryFailed);

        function querySucceeded(data) {
            
            if (data.results.length == 0) {
                $scope.evaluationToSave = 1;
            }
            else {
                $scope.evaluationToSave = data.results[0].evaluation_id + 1;
            }
            //for each employee create evaluation
            for (j = 0; j < $scope.customerMails.length; j++) {
                for (i = 0; i < $scope.employeesNames.length; i++) {
                    addEvaluation($scope.employeesNames[i].employeename,
                        $scope.employeesNames[i].employeeid,
                        ($scope.appraisalToSave + j),
                        ($scope.evaluationToSave + ($scope.employeesNames.length * j) + i));
                }
            }

            sendAllMails();
            
            function sendAllMails() {

                $("#yes").unbind("click");
                $("#no").unbind("click");

                unblock();
                //$scope.appraisalToSend = $scope.appraisalToSave +
                //    ($scope.customerMails.length == 1 ? "" : ("-" + ($scope.appraisalToSave + $scope.customerMails.length - 1)));
                $scope.appraisalToSend = $scope.customerMails.length;
                $scope.$apply();
                question();
                $('#yes').click(function () {                     
                    block();
                    logger.info("Sending mails");
                    for (j = 0; j < $scope.mailstoSend.length; j++) {
                        var url = feedBackExternalUrl + "/CustomerFeedback/FeedBackForm.html?app_id=" + ($scope.mailstoSend[j].appraisal_id);

                        dataserviceRequests.sendMail($scope.mailstoSend[j].customermail,
                            ("Appraisals for " + $scope.mailstoSend[j].project + " -" + $scope.mailstoSend[j].type + "," + $scope.mailstoSend[j].year),
                            ($scope.mailText + "\n" + url + "\nValidation Key: " + $scope.mailstoSend[j].validate_key));

                    }

                    //save data into the database and on success send mails
                    dataserviceRequests.saveChanges();
                    unblock();
                    return true;
                });

                $('#no').click(function () {
                    unblock();
                    dataserviceRequests.clear();
                    return false;
                });
            }


        }

        function queryFailed(error) {
            unblock();
            logger.error(error, "Error Occured in Saving")
        }
    };


    addEvaluation = function (employee_name, employee_id, app_id, id) {

        dataserviceRequests.createEvaluation({
            evaluation_id: id,
            appraisal_id: app_id,
            employee_id: employee_id,
            employee_name: employee_name
        });
    };
    
    //on load of the form retrieve all the project names and all the employees
    $scope.retrievedata = function () {
        block();
        $scope.projects = [];
        $scope.allEmployee = [];
        $scope.yearText = new Date().getFullYear();
        $.ajax({
            type: "GET",
            url: projectURL,
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },

             success: function (data) {
                for (var i = 0, len = data.length; i < len; i++) {
                    $scope.projects.push({ projectId: data[i].assignment, projectName: data[i].name });
                };
                $scope.$apply();
                logger.success("Project Details Loaded");
                
                var first, last, full;

                $.ajax({
                    type: "GET",
                    url: employeeURL,
                    dataType: 'json',
                    xhrFields: {
                        withCredentials: true
                    },

                    success: function (data) {
                        for (var i = 0, len = data.length; i < len; i++) {
                            first = data[i].firstName;
                            last = data[i].lastName;
                            full = first + " " + last;
                            $scope.allEmployees.push(full);
                        };
                        logger.success("Employee Details Loaded");
                        unblock();
                    }
                });
                
            },
            error: function (error) {
                unblock();
                logger.error("Check Network Connectivity and Retry");
            }
        });        
    };


    $scope.changeDuration = function () {
        $scope.selectedDuration = $scope.duration.durationType;
    }


    //when the selected project is changed, update fields accordingly
    $scope.updateFields = function () {
        block();
        $scope.employeesNames = [];
        $scope.customerMails = [];
        $scope.selectetProject = $scope.project.projectName;

        $.ajax({
            url: projectURL,
            dataType: 'json',
            async: false,
            xhrFields: {
                withCredentials: true
            },

            success: function (data) {
                for (var i = 0, len1 = data.length; i < len1; i++) {
                    if (data[i].name.toLowerCase() == $scope.project.projectName.toLowerCase()) {
                        var newEmployee = data[i].rep;
                        employeeName(newEmployee);
                        for (var j = 0, len2 = (data[i].members).length; j < len2; j++) {
                            newEmployee = data[i].members[j];
                            employeeName(newEmployee);
                        }
                        customerMail(data[i].assignment);
                    }
                };
                unblock();
            },
            error: function () {
                unblock();
                logger.error("Error Occurred in Loading Data");
            }

        });
    }


    //given a employee id, search for the employee name and save to list
    employeeName = function (employeeID) {

        var first, last, full;

        $.ajax({
            url: employeeURL,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },

            success: function (data) {
                for (var i = 0, len = data.length; i < len; i++) {
                    if (data[i].id.toLowerCase() == employeeID.toLowerCase()) {
                        first = data[i].firstName;
                        last = data[i].lastName;
                        full = first + " " + last;
                        $scope.employeesNames.push({ employeename: full.toProperCase(), employeeid:  employeeID});
                        $scope.$apply();
                    }
                };
            }
        });
    }


    //given a project name save customer mails of it
    customerMail = function (projectID) {
        var customername, customermail;
        $.ajax({
            url: customerURL,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },

            success: function (data) {
                for (var i = 0, len1 = data.length; i < len1; i++) {
                    for (var k = 0, len3 = data[i].contactAssignment.length; k < len3; k++){
                        if (data[i].contactAssignment[k].assignment.toLowerCase() == projectID.toLowerCase()) {
                            for (var j = 0, len2 = data[i].contactAssignment[k].contactList.length; j < len2; j++) {
                                customername = data[i].contactAssignment[k].contactList[j].name;
                                customermail = data[i].contactAssignment[k].contactList[j].email;
                                $scope.customerMails.push({ customername: customername, customermail: customermail });
                                $scope.$apply();
                            }
                            break;
                        }
                    }
                };
            }
        });
    }


    //method to get the proper case for a given string
    String.prototype.toProperCase = function () {
        return this.toLowerCase().replace(/^(.)|\s(.)/g,
            function ($1) { return $1.toUpperCase(); });
    }

    block = function () {
        $.blockUI({
            css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            }
        });
    };

    unblock = function () {
        $.unblockUI();
    };

    question = function () {
        $.blockUI({
            message: $('#question'),
            css: {
                width: '400px',
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            }
        });
    };

}
);
