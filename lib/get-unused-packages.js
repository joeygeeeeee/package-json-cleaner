'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getUnusedPackages;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUnusedPackages(packageUsages, packageList) {
    var packagesUsed = _ramda2.default.keys(packageUsages);
    return _ramda2.default.filter(function (pkg) {
        return !_ramda2.default.contains(pkg, packagesUsed);
    }, packageList);
}