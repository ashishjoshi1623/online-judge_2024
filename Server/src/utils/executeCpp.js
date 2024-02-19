import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {exec} from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname,"cppOutputs"); //D:\AlgoUniversity\online-judge\Server\src\utils\cppOutputs

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, { recursive : true });
}

const executeCpp = async (filePath,testCase) => {
    // console.log(testCase);
    const jobId = path.basename(filePath).split(".")[0]; //['filename','cpp'], get only 'filename'
    const execFile = `${jobId}.exe`;
    const outPath = path.join(outputPath,execFile); //D:\AlgoUniversity\online-judge\Server\src\utils\cppOutputs\a760bde8-f573-49b4-a11a-31a2e3b4cf31.exe

    return new Promise((resolve, reject) => {
        exec(
            `g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${execFile}`,
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            }
        );
    });

}

export {executeCpp}