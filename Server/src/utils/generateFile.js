import fs from 'fs';
import path from 'path';
import { v4 as uuid }  from 'uuid'; 
import { fileURLToPath } from 'url';

//Es module does not have a direct __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); //D:\AlgoUniversity\online-judge\Server\src\utils


const dirCodes = path.join(__dirname,'codes'); //D:\AlgoUniversity\online-judge\Server\src\utils\codes

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, { recursive : true });
}

const generateFile = async (format, content) => {
    const jobId = uuid(); //This generates a unique string
    const fileName = `${jobId}.${format}`; //Full fullname with extension

    // console.log(fileName);

    const filePath = path.join(dirCodes, fileName); //D:\AlgoUniversity\online-judge\Server\src\utils\codes\uniqueString.format
    fs.writeFileSync(filePath, content);
    return filePath;
}

export {generateFile}