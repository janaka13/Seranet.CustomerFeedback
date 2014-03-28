/* dataservice: data access and model management layer */
app.RequestFormDataservice = (function (breeze, logger) {

    breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true);

    var serviceName = 'breeze/CustomerFeedbackDb'; // route to the same origin Web Api controller

    var manager = new breeze.EntityManager(serviceName);
    manager.enableSaveQueuing(true);
    manager.metadataStore.importMetadata(manager.executeQuery(breeze.EntityQuery.from("Metadata")));

    var RequestFormDataservice = {
        createAppraisal: createAppraisal,
        createEvaluation: createEvaluation,
        saveChanges: saveChanges,
        sendMail: sendMail,
        clear: clear,
        getHash: getHash,
    };

    return RequestFormDataservice;
    
    function clear() {
        var cachedAppraisals = manager.getEntities('Appraisal'); 
        cachedAppraisals.forEach(function (entity) { manager.detachEntity(entity); });
        var cachedEvaluations = manager.getEntities('Evaluation');
        cachedEvaluations.forEach(function (entity) { manager.detachEntity(entity); });
    }

    function createAppraisal(initialValues) {
        var entityType = manager.metadataStore.getEntityType('Appraisal');
        var newAppraisal = entityType.createEntity(initialValues);
        return manager.addEntity(newAppraisal);
    }

    function createEvaluation(initialValues) {
        var entityType = manager.metadataStore.getEntityType('Evaluation');
        var newEvaluation = entityType.createEntity(initialValues);
        return manager.addEntity(newEvaluation);
    }

    function saveChanges() {
        return manager.saveChanges()
            .then(saveSucceeded)
            .fail(saveFailed);

        function saveSucceeded(saveResult) {
            logger.success("Saved Appraisals Successfully");
        }

        function saveFailed(error) {
            logger.error(error, "Failed Saving Appraisals");
        }
    }

    function sendMail(address, subject, message) {
        return manager.executeQuery(breeze.EntityQuery.from("sendMail")
            .withParameters({ address: address, subject: subject, message: message }));
    }

    function getHash(validationKey) {
        return manager.executeQuery(breeze.EntityQuery.from("getHash")
            .withParameters({ validationKey: validationKey}));
    }

})(breeze, app.logger);
