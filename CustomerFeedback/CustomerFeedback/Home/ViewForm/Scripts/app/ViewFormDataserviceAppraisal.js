/* dataservice: data access and model management layer */
app.ViewFormDataserviceAppraisal = (function (breeze, logger) {

    breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true);

    var serviceName = 'breeze/Appraisal'; // route to the same origin Web Api controller
    var EntityQuery = breeze.EntityQuery;
    var FilterQueryOp = breeze.FilterQueryOp;
    var Predicate = breeze.Predicate;

    var manager = new breeze.EntityManager(serviceName);
    manager.enableSaveQueuing(true);

    var ViewFormDataserviceAppraisal = {
        getApps: getApps,
        getAppsFiltered: getAppsFiltered,
        getTop: getTop,
    };

    return ViewFormDataserviceAppraisal;

    function getApps() {

        var query = breeze.EntityQuery
                .from("Appraisals")
                .orderBy("appraisal_id");
        return manager.executeQuery(query);
    }

    function getAppsFiltered(project, pageSize, pageSkip) {

        var query;
        var p1 = new Predicate.create("project_name", FilterQueryOp.Contains, project);
        var predicate = "";

        if (project != "") {
            if (predicate == "") {
                predicate = p1;
            }
            else {
                predicate = predicate.and(p1)
            }
        }

        if (predicate == "") {
            query = breeze.EntityQuery
                .from("Appraisals")
                .orderBy("appraisal_status, is_viewed, appraisal_id")
                .skip(pageSize * pageSkip) // skip a page
                .take(pageSize)            // take a page
                .inlineCount();
        }
        else {
            query = breeze.EntityQuery
                        .from("Appraisals")
                        .where(predicate)
                        .orderBy("appraisal_status, is_viewed, appraisal_id ")
                        .skip(pageSize * pageSkip) // skip a page
                        .take(pageSize)            // take a page
                        .inlineCount();
        }

        return manager.executeQuery(query);
    }

    function getTop() {

        var query = breeze.EntityQuery
                .from("Appraisals")
                .orderBy("appraisal_id desc")
                .take(1);
        return manager.executeQuery(query);
    }

})(breeze, app.logger);
