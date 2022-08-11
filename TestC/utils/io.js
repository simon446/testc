import { readFile, writeFile, readdir, access, mkdir } from "fs";

export function writefile(path, data) {
  return new Promise((resolve, reject) => {
    writeFile(path, data, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export function readfile(path) {
  return new Promise((resolve, reject) => {
    readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export function getFiles(path) {
  return new Promise((resolve, reject) => {
    readdir(path, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

export function hasDir(path) {
  return new Promise((resolve, reject) => {
    access(path, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

export function makeDir(path) {
  return new Promise((resolve, reject) => {
    mkdir(path, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
