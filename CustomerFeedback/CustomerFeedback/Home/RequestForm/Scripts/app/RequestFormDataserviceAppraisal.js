/* dataservice: data access and model management layer */
app.RequestFormDataserviceAppraisal = (function (breeze, logger) {

    breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true);

    var serviceName = 'breeze/Appraisal'; // route to the same origin Web Api controller

    var manager = new breeze.EntityManager(serviceName);
    manager.enableSaveQueuing(true);

    var RequestFormDataserviceAppraisal = {
        getApps: getApps,
        getTop: getTop,     
    };

    return RequestFormDataserviceAppraisal;

    function getApps() {
        
        var query = breeze.EntityQuery
                .from("Appraisals")
                .orderBy("appraisal_id");
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
