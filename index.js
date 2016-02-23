#!/usr/bin/env node
'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _readlineSync = require('readline-sync');

var _readlineSync2 = _interopRequireDefault(_readlineSync);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

var _packageJsonCleaner = require('./lib/package-json-cleaner');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filePath;

if (process.argv[2]) {
    var filePath = process.argv[2];
    if (_fs2.default.existsSync(filePath)) {
        if (_fs2.default.lstatSync(filePath).isDirectory()) {
            filePath += 'package.json';
        } else if (! ~filePath.indexOf('/')) {
            filePath = process.cwd() + '/' + filePath;
        } else if (filePath[0] === '.') {
            filePath = _path2.default.join(process.cwd(), filePath);
        }
    }
} else {
    filePath = process.cwd() + '/package.json';
}

var packageJsonFile = _jsonfile2.default.readFileSync(filePath);

var packageList = (0, _packageJsonCleaner.getPackageList)(packageJsonFile);

var segs = filePath.split('/');
var dir = segs.slice(0, segs.length - 1).join('/');

(0, _packageJsonCleaner.getPackageUsages)(dir, packageList).then(function (packageUsages) {

    var rules = [/require\(["'][A-Za-z0-9-]+["']\)/, /import [A-Za-z0-9_{}, ]+ from ['"][A-Za-z0-9-]+['"];?/];
    var unused = (0, _packageJsonCleaner.getUnusedPackages)(packageUsages, packageList);
    var dubiousUsages = (0, _packageJsonCleaner.getDubiousPackages)(packageUsages, rules);

    for (var dubiousUsage in dubiousUsages) {

        var isInUse = false;

        console.log(_chalk2.default.yellow('We\'re not sure about \'' + dubiousUsage + '\''));

        dubiousUsages[dubiousUsage].forEach(function (usage) {
            console.log('\t Is');
            console.log('\t ' + _chalk2.default.blue(usage.usage) + ' in ' + _chalk2.default.blue(usage.file + ':' + usage.line));
            if (!isInUse && _readlineSync2.default.keyInYN('\t A valid use of this module?: ')) {
                isInUse = true;
            }
        });

        if (!isInUse) unused.push(dubiousUsage);
    }

    if (_readlineSync2.default.keyInYN('Would you like to remove the following packages from your package.json file? \n' + _chalk2.default.red(unused.join('\n')))) {
        var cleanFile = (0, _packageJsonCleaner.removePackages)(packageJsonFile, unused);
        _jsonfile2.default.writeFileSync(filePath, cleanFile, { spaces: 2 });
    }
}).catch(console.log);
