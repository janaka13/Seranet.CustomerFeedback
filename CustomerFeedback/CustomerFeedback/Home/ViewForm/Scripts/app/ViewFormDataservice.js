/* dataservice: data access and model management layer */
app.ViewFormDataservice = (function (breeze, logger) {

    breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true);

    var FilterQueryOp = breeze.FilterQueryOp;
    var Predicate = breeze.Predicate;

    //route to the same origin Web Api controller
    var managerAppraisal = new breeze.EntityManager('breeze/Appraisal');
    managerAppraisal.enableSaveQueuing(true);

    var managerCriteria = new breeze.EntityManager('breeze/Criteria');
    managerCriteria.enableSaveQueuing(true);

    var managerEvaluation = new breeze.EntityManager('breeze/Evaluation');
    managerEvaluation.enableSaveQueuing(true);

    var managerRating = new breeze.EntityManager('breeze/Rating');
    managerRating.enableSaveQueuing(true);

    var managerTemplate = new breeze.EntityManager('breeze/Template');
    managerTemplate.enableSaveQueuing(true);

    var managerTemplateStructure = new breeze.EntityManager('breeze/TemplateStructure');
    managerTemplateStructure.enableSaveQueuing(true);

    //entity manager for whole db.Mainly for data saving purpose
    var managerDB = new breeze.EntityManager('breeze/CustomerFeedbackDb');
    managerDB.enableSaveQueuing(true);
    managerDB.metadataStore.importMetadata(managerDB.executeQuery(breeze.EntityQuery.from("Metadata")));


    var ViewFormDataservice = {
        getAppraisalData: getAppraisalData,
        getEvaluationData: getEvaluationData,
        getRatingData: getRatingData,
        setViewAppraisal: setViewAppraisal,
    };
    return ViewFormDataservice;

    function getAppraisalData(appraisal_id) {
        var getTemplateData_q = breeze.EntityQuery
            .from("Appraisals")
            .where("appraisal_id", "eq", parseInt(appraisal_id))
            .expand("template, template.templateStructures, template.templateStructures.criteria");
        return managerAppraisal.executeQuery(getTemplateData_q);
    }

    function getEvaluationData(appraisal_id) {
        var getEvaluation_q = breeze.EntityQuery
                .from("Evaluations")
                .orderBy("evaluation_id")
                .where("appraisal_id", "eq", parseInt(appraisal_id));
        return managerEvaluation.executeQuery(getEvaluation_q);
    }

    function getRatingData(evaluation_id, criteria_id) {
        var p1 = new Predicate.create("evaluation_id", "eq", parseInt(evaluation_id));
        var p2 = new Predicate.create("criteria_id", "eq", parseInt(criteria_id));
        var getRating_q = breeze.EntityQuery
                .from("Ratings")
                .orderBy("rating_Id")
                .where(p1.and(p2))
                .expand("criteria, evaluation");
        
        return managerRating.executeQuery(getRating_q);
    }

    function setViewAppraisal(appraisalId) {
        var appId = { appId: appraisalId };
        $.ajax({
            type: 'POST',
            url: 'api/SetView',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(appId),
            success: function (data) {
                logger.success("Appraisal set viewed");
            },
            error: function () {
                logger.error("Appraisal set viewed failed");
            }
        });
    }



})(breeze, app.logger);