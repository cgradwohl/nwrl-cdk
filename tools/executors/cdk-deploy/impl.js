"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
function CDKDeployExecutor(options) {
    return new Promise(function (resolve, reject) {
        var command = "npx cdk deploy --app \"".concat(options.filePath, "\"");
        console.info("Executing ".concat(command, " \n"));
        var child = (0, child_process_1.spawn)(command, {
            shell: true,
            stdio: 'inherit'
        });
        /**
         * https://nodejs.org/api/child_process.html#event-exit
         */
        child.on('exit', function (code) {
            if (code === 1) {
                resolve({ success: false });
            }
            resolve({ success: true });
        });
    });
}
exports["default"] = CDKDeployExecutor;
