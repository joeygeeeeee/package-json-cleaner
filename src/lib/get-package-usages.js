var exec = require('child_process').exec;
import path from 'path';
import R from 'ramda';

export default function getPackageUsages(directory, packages, exclude) {

    var usages = {};

    var excludeDir = R.join(',', R.concat(R.map(dir => path.join(directory,dir) ,exclude), [path.join(directory,'node_modules')]));

    return Promise.all(packages.map(function (pkg) {
        return new Promise((res, rej) => {

            exec(`grep pattern -nre [\\'\\"]${pkg}[\\'\\"] ${directory} --exclude-dir={${excludeDir}} --exclude=*package.json`, function (error, stdout) {

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