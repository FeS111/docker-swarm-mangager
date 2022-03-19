"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawn = exports.exec = void 0;
var child_process_1 = require("child_process");
var MAX_BUFFER = 10 * Math.pow(2, 20);
function exec(command, stdout, stderr) {
    return new Promise(function (resolve, reject) {
        try {
            var stdoutbuf_1 = "";
            var stderrbuf_1 = "";
            // EXEC CHILD PROCESS
            var p = child_process_1.exec(command, { maxBuffer: MAX_BUFFER }, function (err, out) {
                if (err)
                    return reject(err);
                if (stdoutbuf_1.length > 0 && typeof stdout === 'function')
                    stdout(stdoutbuf_1);
                if (stderrbuf_1.length > 0 && typeof stderr === 'function')
                    stderr(stderrbuf_1);
                resolve(out);
            });
            // PIPE STDOUT
            if (typeof stdout === 'function') {
                p.stdout.on("data", function (chunk) {
                    stdoutbuf_1 += chunk;
                    var i = -1;
                    while ((i = stdoutbuf_1.indexOf('\n')) >= 0) {
                        var line = stdoutbuf_1.substring(0, i);
                        stdoutbuf_1 = stdoutbuf_1.substring(i + 1);
                        if (typeof stdout === 'function') {
                            stdout(line);
                        }
                    }
                });
            }
            else if (typeof stdout !== 'undefined') {
                p.stdout.pipe(stdout);
            }
            // PIPE STDERR
            if (typeof stderr === 'function') {
                p.stderr.on("data", function (chunk) {
                    stderrbuf_1 += chunk;
                    var i = -1;
                    while ((i = stderrbuf_1.indexOf('\n')) >= 0) {
                        var line = stderrbuf_1.substring(0, i);
                        stderrbuf_1 = stderrbuf_1.substring(i + 1);
                        if (typeof stderr === 'function') {
                            stderr(line);
                        }
                    }
                });
            }
            else if (typeof stderr !== 'undefined') {
                p.stderr.pipe(stderr);
            }
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.exec = exec;
function spawn(command, args, stdout, stderr) {
    return new Promise(function (resolve, reject) {
        try {
            var p = child_process_1.spawn(command, args);
            if (stdout)
                p.stdout.pipe(stdout);
            if (stderr)
                p.stderr.pipe(stderr);
            p.on('close', function (code, sig) {
                if (!code)
                    resolve();
                else
                    reject();
            });
            p.on('error', reject);
            p.on('exit', function (code, sig) {
                if (!code)
                    resolve();
                else
                    reject();
            });
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.spawn = spawn;
//# sourceMappingURL=index.js.map