import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec, spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url); //current file path
const __dirname = path.dirname(__filename); //utils folder

const outputPath = path.join(__dirname, "cppOutputs"); //create cppoutput folder inside utils folder

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (filePath, testCase) => {
    const jobId = path.basename(filePath).split(".")[0];
    const execFile = `${jobId}.exe`;
    const outPath = path.join(outputPath, execFile);

    return new Promise((resolve, reject) => {
        exec(
            `g++ ${filePath} -o ${outPath}`,
            (error, stdout, stderr) => {
                if (error) {
                    // console.log("compiletime error: " + error);
                    let errOutput = 'syntax error';
                    resolve(errOutput);
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                const child = spawn(outPath); // Corrected path usage here
                child.stdin.write(testCase);
                child.stdin.end();
                let output = '';
                child.stdout.on("data", (data) => {
                    output += data;
                });
                child.on("close", (code) => {
                    resolve(output);
                });
                child.on("error", (err) => {
                    let errOutput = 'system error';
                    resolve(errOutput);
                    reject(err);
                });
            }
        );
    });
}

export { executeCpp };