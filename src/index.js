import fs from "fs";
import path from "path";
import { json2xlsx } from "./json-2-xlsx.js";
import { xlsx2json } from "./xlsx-2-json.js";

const argv = process.argv.slice(2);
if (argv.length < 2) {
  console.log("Usage: npm run [2-xlsx | 2-json] <path>");
  process.exit(1);
}

const convertType = argv[0];
const inputPath = argv[1];

function parseRecursiveJSONDirs2XLSX(dirPath, prefix = "") {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);

    const isDirectory = fs.statSync(fullPath).isDirectory();
    if (!isDirectory) {
      return;
    }

    const p = prefix.length ? `${prefix}_${file}` : file;
    const outFilePath = path.join(dirPath, `locales_${p}.xlsx`);

    console.log("Converting locales folder", fullPath, "to:", outFilePath);
    json2xlsx(fullPath, outFilePath);

    // recursively parse all files in the directory
    parseRecursiveJSONDirs2XLSX(fullPath, p);
  });
}

function parseXLSXDir2JSON(dirPath) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);

    const isDirectory = fs.statSync(fullPath).isDirectory();
    if (isDirectory) {
      return;
    }

    const outSubDir = path.basename(file, path.extname(file)).split("_")[1];
    const fullOutPath = path.join(dirPath, outSubDir);
    if (!fs.existsSync(fullOutPath)) {
      fs.mkdirSync(fullOutPath, { recursive: true });
    }

    console.log("Converting", fullPath, "into .JSON locales folder:", fullOutPath);
    xlsx2json(fullPath, fullOutPath);
  });
}

if (convertType === "2-xlsx") {
  parseRecursiveJSONDirs2XLSX(inputPath);
} else if (convertType === "2-json") {
  parseXLSXDir2JSON(inputPath);
} else {
  console.log("Invalid conversion type. Please use '2-xlsx' or '2-json'.");
  process.exit(1);
}
