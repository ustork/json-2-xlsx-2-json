/*json to xlsx*/
import fs from "fs";
import path from "path";
import xlsx from "node-xlsx";

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

function readFile(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function json2xlsx(dir, out) {
  var files = getFiles(dir);
  var data = [];
  for (const file of files) {
    var fileName = path.basename(file);
    var flatObject = getFlatObject(readFile(file));
    var arrayFromObject = Object.entries(flatObject);
    data.push({ name: fileName, data: arrayFromObject });
  }
  fs.writeFileSync(out, xlsx.build(data));
}
