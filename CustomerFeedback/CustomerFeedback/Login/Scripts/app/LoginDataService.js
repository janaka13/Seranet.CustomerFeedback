/* dataservice: data access and model management layer */
app.LoginDataService = (function (breeze, logger) {

    breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true);

    var serviceName = 'breeze/CustomerFeedbackDb'; // route to the same origin Web Api controller

    var manager = new breeze.EntityManager(serviceName);
    manager.enableSaveQueuing(true);

    var LoginDataService = {
        getUsers: getUsers,
        getUser: getUser,
    };

    return LoginDataService;

    function getUsers() {

        var query = breeze.EntityQuery
                .from("Login");
        return manager.executeQuery(query);
    }

    function getUser() {
        //get one user by username
    }

})(breeze, app.logger);
