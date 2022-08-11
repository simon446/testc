import { spawn } from 'child_process';

export function py(code, timeout = 500) {
    return new Promise((resolve) => {
        const child = spawn('python3', ['-u', '-c', code]);
        let stdout = '';
        let stderr = '';

        child.stdout.on('data', data => {
            stdout += data.toString();
        });
        
        child.stderr.on('data', data => {
            stderr += data.toString();
        });
        
        child.on('exit', function () {
            if (stderr) {
                resolve({
                    error: true,
                    stderr
                });
            } else {
                resolve({
                    error: false,
                    stdout
                });
            }
        })

        // Abort the process if it takes too long
        setTimeout(() => {
            if (child.exitCode === null) {
                child.kill();
                resolve({
                    error: true,
                    stderr: "Timeout"
                });
            }
        }, timeout);
    });
}

export async function run_assertions(code,
                                     assertions,
                                     i = { count: 0 },
                                     N = assertions.length - 1,
                                     comment = '') {
    const result = [];

    for (let assertion of assertions) {
        const code1 = code + '\n' + assertion;
        let status = await py(code1);

        console.log(`${i.count}/${N}: ${status.error ? "0" : "1"} --- ${comment}`);

        if (status.error) {
            result.push(false);
        } else {
            result.push(true);
        }
        i.count++;
    }

    return result;
}