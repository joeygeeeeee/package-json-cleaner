"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = removePackages;
function removePackages(file, packages) {

    packages.forEach(function (pkg) {
        if (file.dependencies[pkg]) {
            delete file.dependencies[pkg];
        } else if (file.devDependencies[pkg]) {
            delete file.devDependencies[pkg];
        }
    });

    return file;
}