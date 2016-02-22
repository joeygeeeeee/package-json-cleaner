#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readlineSync from 'readline-sync';
import chalk from 'chalk';
import R from 'ramda';
import jsonfile from 'jsonfile';

import getPackageList from './lib/get-package-list';
import getPackageUsages from './lib/get-package-usages';
import getUnusedPackages from './lib/get-unused-packages';
import getDubiousPackages from './lib/get-dubious-packages';
import removePackages from './lib/remove-packages';

var filePath;

if (process.argv[2]) {
    var filePath = process.argv[2];
    if (fs.existsSync(filePath)) {
        if (fs.lstatSync(filePath).isDirectory()) {
            filePath += 'package.json';
        } else if (!~filePath.indexOf('/')) {
            filePath = `${process.cwd()}/${filePath}`;
        } else if (filePath[0] === '.') {
            filePath = path.join(process.cwd(), filePath);
        }
    }
} else {
    filePath = `${process.cwd()}/package.json`
}

var packageJsonFile = jsonfile.readFileSync(filePath);

var packageList = getPackageList(packageJsonFile);

var segs = filePath.split('/');
var dir = segs.slice(0, segs.length - 1).join('/');

getPackageUsages(dir, packageList).then((packageUsages) => {

    var rules = [/require\(["'][A-Za-z0-9-]+["']\)/, /import [A-Za-z0-9_{}, ]+ from ['"][A-Za-z0-9-]+['"];?/];
    var unused = getUnusedPackages(packageUsages, packageList);
    var dubiousUsages = getDubiousPackages(packageUsages, rules);

    for (let dubiousUsage in dubiousUsages) {

        var isInUse = false;

        console.log(chalk.yellow(`We're not sure about '${dubiousUsage}'`));

        dubiousUsages[dubiousUsage].forEach(function (usage) {
            console.log(`\t Is`);
            console.log(`\t ${chalk.blue(usage.usage)} in ${chalk.blue(`${usage.file}:${usage.line}`)}`);
            if (!isInUse && readlineSync.keyInYN('\t A valid use of this module?: ')) {
                isInUse = true;
            }
        });

        if (!isInUse) unused.push(dubiousUsage);

    }

    if (readlineSync.keyInYN(`Would you like to remove the following packages from your package.json file? \n${chalk.red(unused.join('\n'))}`)) {
        var cleanFile = removePackages(packageJsonFile, unused);
        jsonfile.writeFileSync(filePath, cleanFile, {spaces: 2});
    }

}).catch(console.log);








