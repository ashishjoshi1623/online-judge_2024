import {spawn} from "child_process";


const executePy = async (filePath,testCase) => {
    // console.log(testCase)
    const inputs = testCase.split(" ");
    let str = "";
    for(var i=0; i<inputs.length-1; i++){
      str = str + inputs[i] + "\n";
    }
    str = str + inputs[inputs.length -1];

    return await new Promise((resolve, reject) => {
      const pythonProcess = spawn("python3", [filePath]);
        if(testCase){
        pythonProcess.stdin.write(str);
        pythonProcess.stdin.end();
        }
        let result = "";
        pythonProcess.stdout.on("data", (data) => {
          result += data.toString();
        });
        pythonProcess.stderr.on("data", (data) => {
         reject(`Error from ashish: ${data.toString()}`);
        });
        pythonProcess.stdout.on("end", () => {
          resolve(result.trim()); // Resolve with trimmed string
        });
      
    });
}

export {executePy}