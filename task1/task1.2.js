import fs from "fs";
import csvtojson from "csvtojson";
import readline from "readline";

const readFile = "./task1/nodejs-hw1-ex1.csv";
const writeFile = "./task1/result.txt";

const readStream = fs.createReadStream(readFile);
const writeStream = fs.createWriteStream(writeFile);

readline
  .createInterface({
    input: readStream.pipe(csvtojson()),
  })
  .on("line", (line) => {
    console.log(`Writing line: "${line}"`);
    writeStream.write(line + "\n");
  })
  .on("close", () => {
    console.log(
      `File "${readFile}" has successfully been written to "${writeFile}"`
    );
  })
  .on("error", (error) => {
    console.error(error);
  });
