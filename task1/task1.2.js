import fs from "fs";
import csvtojson from "csvtojson";
import { pipeline } from "stream";

const readFile = "./task1/nodejs-hw1-ex1.csv";
const writeFile = "./task1/result.txt";

const readStream = fs.createReadStream(readFile);
const writeStream = fs.createWriteStream(writeFile);

const errorCallback = (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(
      `File "${readFile}" has successfully been written to "${writeFile}"`
    );
  }
};

pipeline(readStream, csvtojson(), writeStream, errorCallback);
