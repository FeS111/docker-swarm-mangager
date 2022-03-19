import { exec as shell_exec, spawn as shell_spawn } from 'child_process';

const MAX_BUFFER = 10 * Math.pow(2, 20);

export function exec(command: string, stdout: (...args) => void | NodeJS.WriteStream, stderr: (...args) => void | NodeJS.WriteStream) {
    return new Promise<string>((resolve, reject) => {
        try {
            let stdoutbuf = "";
            let stderrbuf = "";

            // EXEC CHILD PROCESS
            const p = shell_exec(command, { maxBuffer: MAX_BUFFER }, (err, out) => {
                if (err) return reject(err);

                if (stdoutbuf.length > 0 && typeof stdout === 'function') stdout(stdoutbuf);
                if (stderrbuf.length > 0 && typeof stderr === 'function') stderr(stderrbuf);

                resolve(out);
            });

            // PIPE STDOUT
            if (typeof stdout === 'function') {
                p.stdout.on("data", chunk => {
                    stdoutbuf += chunk;
                    let i = -1;
                    while ((i = stdoutbuf.indexOf('\n')) >= 0) {
                        const line = stdoutbuf.substring(0, i);
                        stdoutbuf = stdoutbuf.substring(i + 1);
                        if (typeof stdout === 'function') {
                            stdout(line);
                        }
                    }
                });
            } else if (typeof stdout !== 'undefined') {
                p.stdout.pipe(stdout);
            }

            // PIPE STDERR
            if (typeof stderr === 'function') {
                p.stderr.on("data", chunk => {
                    stderrbuf += chunk;
                    let i = -1;
                    while ((i = stderrbuf.indexOf('\n')) >= 0) {
                        const line = stderrbuf.substring(0, i);
                        stderrbuf = stderrbuf.substring(i + 1);
                        if (typeof stderr === 'function') {
                            stderr(line);
                        }
                    }
                });
            } else if (typeof stderr !== 'undefined') {
                p.stderr.pipe(stderr);
            }
        } catch (err) {
            reject(err);
        }
    });
}

export function spawn(command: string, args: string[], stdout?: NodeJS.WriteStream, stderr?: NodeJS.WriteStream) {
    return new Promise<void>((resolve, reject) => {
        try {
            const p = shell_spawn(command, args);

            if (stdout) p.stdout.pipe(stdout);
            if (stderr) p.stderr.pipe(stderr);

            p.on('close', (code, sig) => {
                if (!code) resolve();
                else reject();
            });
            p.on('error', reject);
            p.on('exit', (code, sig) => {
                if (!code) resolve();
                else reject();
            });
        } catch (err) {
            reject(err);
        }
    });
}