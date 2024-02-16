import { execFile, spawnSync } from "child_process";
import {exec} from "child_process";
import fs  from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname,"javaOutputs");

const getMainClass = () => {
    // spawnSync("javac", ["-d", outputPath, filePath]);

    return new Promise((resolve, reject) => {
        exec(
            `cd ${outputPath} && ls`,
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
    })
}

export {getMainClass}