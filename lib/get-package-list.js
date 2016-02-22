"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getPackageList;
function getPackageList(file) {
    return Object.keys(file.dependencies).concat(Object.keys(file.devDependencies));
}