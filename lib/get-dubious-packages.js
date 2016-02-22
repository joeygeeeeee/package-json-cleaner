'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getDubiousPackages;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDubiousPackages(packageUsages, rules) {

    var listOfPredicates = _ramda2.default.map(function (rule) {
        return _ramda2.default.compose(_ramda2.default.length, _ramda2.default.match(rule));
    }, rules);
    var passesAnyRules = _ramda2.default.anyPass(listOfPredicates);
    var anyPassAllRules = _ramda2.default.any(passesAnyRules);
    var noneDubiousUsage = _ramda2.default.compose(anyPassAllRules, _ramda2.default.map(function (pkg) {
        return _ramda2.default.prop('usage', pkg);
    }));
    return _ramda2.default.reject(noneDubiousUsage, packageUsages);
}