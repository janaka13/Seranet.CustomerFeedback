app.RequestFormDataserviceEvaluation = (function (breeze, logger) {

    breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true);

    var serviceName = 'breeze/Evaluation'; // route to the same origin Web Api controller

    var manager = new breeze.EntityManager(serviceName);
    manager.enableSaveQueuing(true);

    var RequestFormDataserviceEvaluation = {
        getEvals: getEvals,
        getTop: getTop,
    };

    return RequestFormDataserviceEvaluation;

    function getEvals() {

        var query = breeze.EntityQuery
                .from("Evaluations")
                .orderBy("evaluation_id");
        return manager.executeQuery(query);
    }

    function getTop() {

        var query = breeze.EntityQuery
                .from("Evaluations")
                .orderBy("evaluation_id desc")
                .take(1);
        return manager.executeQuery(query);
    }

})(breeze, app.logger);