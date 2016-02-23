import assert from 'assert';

import getDubiousPackages from '../../lib/get-dubious-packages';

describe('Get dubious packages usages', () => {

    it('Should return a list of Dubious package usages', () => {

        assert.deepEqual(
            getDubiousPackages(
                {
                    'package-1': [{usage: 'this isn\'t a require line "package-1"'}],
                    'package-3': [{usage: 'var a = require("package-3")'}],
                    'none.dubious-package': [{usage: 'import noneDubiousPackage from "none.dubious-package"'}],
                    'other.none.dubious-package': [{usage: 'var a = require("other.none.dubious-package")'}]
                }, [/require\(["'][A-Za-z0-9-.]+["']\)/, /import [A-Za-z0-9_{}, ]+ from ['"][A-Za-z0-9-.]+['"];?/]),
            {'package-1': [{usage: 'this isn\'t a require line "package-1"'}]}
        );

    });

});