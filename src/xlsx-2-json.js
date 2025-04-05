/*xlsx to json*/

import fs from "fs";
import path from "path";
import xlsx from "node-xlsx";

function stringToObj(path, value, obj) {
  if (!path) return;

  var parts = path.split("."),
    part;
  var last = parts.pop();
  while ((part = parts.shift())) {
    if (typeof obj[part] != "object") obj[part] = {};
    obj = obj[part]; // update "pointer"
  }
  obj[last] = value;
}

function getFlatObject(object) {
  function iter(o, p) {
    if (o && typeof o === "object") {
      Object.keys(o).forEach(function (k) {
        iter(o[k], p.concat(k));
      });
      return;
    }
    fullObj[p.join(".")] = o;
  }

  var fullObj = {};
  iter(object, []);
  return fullObj;
}

function getFiles(dir, files = []) {
  // Get an array of all files and directories in the passed directory using fs.readdirSync
  const fileList = fs.readdirSync(dir);
  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    // Check if the current file/directory is a directory using fs.statSync
    if (fs.statSync(name).isDirectory()) {
      // If it is a directory, recursively call the getFiles function with the directory path and the files array
      getFiles(name, files);
    } else {
      // If it is a file, push the full path to the files array
      files.push(name);
    }
  }
  return files;
}

function readFile(inputFile) {
  return xlsx.parse(inputFile);
}

export function xlsx2json(inputFile, outPath) {
  const xlsxFile = readFile(inputFile);
  for (const table of xlsxFile) {
    const fileName = table.name;
    var jsonOjb = {};
    for (const row of table.data) {
      stringToObj(row[0], row[1], jsonOjb);
    }

    const outFilePath = path.join(outPath, fileName);

    fs.writeFile(outFilePath, JSON.stringify(jsonOjb, null, 2), "utf8", function (err) {
      if (err) throw err;
    });
  }
}
