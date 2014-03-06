app.logger = (function () {

    toastr.options.timeOut = 2000; // 2 second toast timeout
    toastr.options.positionClass = 'toast-bottom-right';

    var logger = {
        error: error,
        info: info,
        success: success,
        warning: warning,
        log: log 
    };

    function error(message, title) {
        toastr.error(message, title);
        log("Error: " + message);
    };
    function info(message, title) {
        toastr.info(message, title);
        log("Info: " + message);
    };
    function success(message, title) {
        toastr.success(message, title);
        log("Success: " + message);
    };
    function warning(message, title) {
        toastr.warning(message, title);
        log("Warning: " + message);
    };

    function log() {
        var console = window.console;
        !!console && console.log && console.log.apply && console.log.apply(console, arguments);
    }

    return logger;
})();