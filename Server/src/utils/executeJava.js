import { execFile, spawnSync } from "child_process";
import {exec} from "child_process";
import fs  from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getMainClass } from "./getMainClass.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname,"javaOutputs");

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, { recursive : true });
}

const executeJava = async (filePath, testCase) => {
    spawnSync("javac", ["-d", outputPath, filePath]);

    const mainClass = await getMainClass(); //HelloWorld.class
    const mainClassName = mainClass.split(".")[0];
    
    return new Promise((resolve, reject) => {
        // const mainClass = fileToExec.split(".")[0];
        const child = exec(
            `cd ${outputPath} && java ${mainClassName} && rm ${mainClass}`,
            //callback
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            }
        
        )
        child.stdin.write(testCase);
        child.stdin.end();
        child.stdout.on("data", (data) => {
            // console.log(`child stdout:\n${data}`);
            resolve(`${data}`);
        });
    })
}

export {executeJava}