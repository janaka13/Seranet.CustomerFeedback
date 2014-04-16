/* dataservice: data access and model management layer */
app.GenerateFormDataserviceAppraisal = (function (breeze, logger) {

    breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true);

    var appraisal_id = getURLParameter("app_id");

    //route to the same origin Web Api controller
    var managerAppraisal = new breeze.EntityManager('breeze/Appraisal');
    managerAppraisal.enableSaveQueuing(true);
    managerAppraisal.metadataStore.importMetadata(managerAppraisal.executeQuery(breeze.EntityQuery.from("Metadata")));

    var managerCriteria = new breeze.EntityManager('breeze/Criteria');
    managerCriteria.enableSaveQueuing(true);
    managerCriteria.metadataStore.importMetadata(managerCriteria.executeQuery(breeze.EntityQuery.from("Metadata")));

    var managerEvaluation = new breeze.EntityManager('breeze/Evaluation');
    managerEvaluation.enableSaveQueuing(true);
    managerEvaluation.metadataStore.importMetadata(managerEvaluation.executeQuery(breeze.EntityQuery.from("Metadata")));

    var managerRating = new breeze.EntityManager('breeze/Rating');
    managerRating.enableSaveQueuing(true);
    managerRating.metadataStore.importMetadata(managerRating.executeQuery(breeze.EntityQuery.from("Metadata")));

    var managerTemplate = new breeze.EntityManager('breeze/Template');
    managerTemplate.enableSaveQueuing(true);
    managerTemplate.metadataStore.importMetadata(managerTemplate.executeQuery(breeze.EntityQuery.from("Metadata")));

    var managerTemplateStructure = new breeze.EntityManager('breeze/TemplateStructure');
    managerTemplateStructure.enableSaveQueuing(true);
    managerTemplateStructure.metadataStore.importMetadata(managerTemplateStructure.executeQuery(breeze.EntityQuery.from("Metadata")));

    //entity manager for whole db.Mainly for data saving purpose
    var managerDB = new breeze.EntityManager('breeze/CustomerFeedbackDb');
    managerDB.enableSaveQueuing(true);
    managerDB.metadataStore.importMetadata(managerDB.executeQuery(breeze.EntityQuery.from("Metadata")));


    var GenerateFormDataserviceAppraisal = {
        getAppraisalData: getAppraisalData,
        getEvaluationData: getEvaluationData,
        createRating: createRating,
        saveChanges: saveChanges,
        invalidateAppraisal: invalidateAppraisal,
        isValidAppraisal: isValidAppraisal,
        getRatingData: getRatingData,
        addToCache: addToCache,
        saveChangesNew: saveChangesNew

    };

    return GenerateFormDataserviceAppraisal;

    function getAppraisalData() {
        var getTemplateData_q = breeze.EntityQuery
            .from("Appraisals")
            .where("appraisal_id", "eq", parseInt(appraisal_id))
            //.select("appraisal_type, appraisal_year, customermail, project_name, template, template.templateStructures, template.templateStructures.criteria")
            .expand("template, template.templateStructures, template.templateStructures.criteria");
        return managerAppraisal.executeQuery(getTemplateData_q);
    }

    function getEvaluationData() {
        var getEvaluation_q = breeze.EntityQuery
                .from("Evaluations")
                .orderBy("evaluation_id")
                .where("appraisal_id", "eq", parseInt(appraisal_id));
        return managerEvaluation.executeQuery(getEvaluation_q);
    }

    function getRatingData(evaluation_id) {
        var getRatings_q = breeze.EntityQuery
                .from("Ratings")
                .orderBy("rating_Id")
                .where("evaluation_id", "eq", parseInt(evaluation_id))
        return managerRating.executeQuery(getRatings_q);
    }


    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }

    function createRating(initialValues) {
        var entityType = managerDB.metadataStore.getEntityType('Rating');
        var newRating = entityType.createEntity(initialValues);
        managerDB.addEntity(newRating);
        return newRating;
    }



    function saveChangesNew() {
        return managerDB.saveChanges()
            .then(saveSucceeded)
            .fail(saveFailed);

        function saveSucceeded(saveResult) {
            //logger.success("# Data " + saveResult.entities.length);
            //logger.log(saveResult);
        }

        function saveFailed(error) {
            var reason = error.message;
            var detail = error.detail;

            if (error.entityErrors) {
                reason = handleSaveValidationError(error);
            } else if (detail && detail.ExceptionType &&
                detail.ExceptionType.indexOf('OptimisticConcurrencyException') !== -1) {
                // Concurrency error 
                reason =
                    "Another user, perhaps the server, " +
                    "may have deleted one or all of the data." +
                    " You may have to restart the app.";
            } else {
                reason = "Failed to save changes: " + reason +
                         " You may have to restart the app.";
            }

            logger.error("Error Occured in Saving");
            // DEMO ONLY: discard all pending changes
            // Let them see the error for a second before rejecting changes
            GenerateFormDataserviceAppraisal.$timeout(function () {
                manager.rejectChanges();
            }, 1000);
            throw error; // so caller can see it
        }
    }



    function saveChanges() {
        return managerRating.saveChanges()
            .then(saveSucceeded)
            .fail(saveFailed);

        function saveSucceeded(saveResult) {
            //logger.success("# Data " + saveResult.entities.length);
            //logger.log(saveResult);
        }

        function saveFailed(error) {
            var reason = error.message;
            var detail = error.detail;

            if (error.entityErrors) {
                reason = handleSaveValidationError(error);
            } else if (detail && detail.ExceptionType &&
                detail.ExceptionType.indexOf('OptimisticConcurrencyException') !== -1) {
                // Concurrency error 
                reason =
                    "Another user, perhaps the server, " +
                    "may have deleted one or all of the data." +
                    " You may have to restart the app.";
            } else {
                reason = "Failed to save changes: " + reason +
                         " You may have to restart the app.";
            }

            logger.error("Error Occured in Saving");
            // DEMO ONLY: discard all pending changes
            // Let them see the error for a second before rejecting changes
            GenerateFormDataserviceAppraisal.$timeout(function () {
                manager.rejectChanges();
            }, 1000);
            throw error; // so caller can see it
        }
    }



    function handleSaveValidationError(error) {
        var message = "Not saved due to validation error";
        try { // fish out the first error
            var firstErr = error.entityErrors[0];
            message += ": " + firstErr.errorMessage;
        } catch (e) { /* eat it for now */ }
        return message;
    }

    function invalidateAppraisal(appraisalId, state) {
        var appId = { appId: appraisalId, state: state };
        $.ajax({
            type: 'POST',
            url: 'api/Send',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(appId),
            success: function (data) {
                //logger.success("Appraisal invalidated");
            },
            error: function () {
                logger.error("Error Occured in Saving");
            }
        });
    }

    function isValidAppraisal(appraisal_Id) {
        var appId = { appId: appraisalId };
        $.ajax({
            type: 'POST',
            url: 'api/CheckStatus',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(appId),
            success: function (data) {
                if (data === "1") {
                    return true;
                }
                else {
                    return false;
                }
            },
            error: function () {
                return false;
            }
        });
        return false;
    }

    function addToCache(item) {
        managerRating.entityChanged.subscribe(
        function () {
            var action = item.entityAction;
            var entity = item.entity;
        });
    }


})(breeze, app.logger);