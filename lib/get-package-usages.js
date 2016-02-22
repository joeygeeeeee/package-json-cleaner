'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getPackageUsages;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exec = require('child_process').exec;
function getPackageUsages(directory, packages) {

    var usages = {};

    return Promise.all(packages.map(function (pkg) {
        return new Promise(function (res, rej) {
            exec('grep -nre [\\\'\\"]' + pkg + '[\\\'\\"] ' + directory + ' --exclude-dir=node_modules --exclude=*package.json', function (error, stdout, stderr) {

                _ramda2.default.forEach(function (line) {
                    var split = _ramda2.default.split(':', line);

                    if (split[1]) {
                        if (!usages[pkg]) usages[pkg] = [];
                        usages[pkg].push({
                            file: split[0],
                            line: split[1],
                            usage: _ramda2.default.trim(_ramda2.default.join(':', _ramda2.default.slice(2, Infinity, split)))
                        });
                    }
                }, _ramda2.default.split('\n', stdout));

                res();
            });
        });
    })).then(function () {
        return usages;
    });
}