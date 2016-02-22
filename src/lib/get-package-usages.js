var exec = require('child_process').exec;
import R from 'ramda';

export default function getPackageUsages(directory, packages) {

    var usages = {};

    return Promise.all(packages.map(function (pkg) {
        return new Promise((res, rej) => {
            exec(`grep -nre [\\'\\"]${pkg}[\\'\\"] ${directory} --exclude-dir=node_modules --exclude=*package.json`, function (error, stdout, stderr) {

                R.forEach((line) => {
                    var split = R.split(':', line);

                    if (split[1]) {
                        if (!usages[pkg]) usages[pkg] = [];
                        usages[pkg].push({
                            file: split[0],
                            line: split[1],
                            usage: R.trim(R.join(':', R.slice(2, Infinity, split)))
                        })
                    }
                }, R.split('\n', stdout));

                res();
            });
        });
    })).then(() => {
        return usages;
    });
}