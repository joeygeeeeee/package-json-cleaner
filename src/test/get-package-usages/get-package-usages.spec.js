import assert from 'assert';

import getPackageUsages from '../../lib/get-package-usages';

describe('Get package usages', () => {

    it('Should return a list of package usages', (done) => {
        getPackageUsages(`${__dirname}/test-directory`, ['package-1', 'package-2', 'package-3'], ['assets']).then((usagesInfo) => {
            var usages = Object.keys(usagesInfo);
            assert.ok(!!~usages.indexOf('package-1'));
            assert.ok(!!~usages.indexOf('package-2'));
            assert.ok(!~usages.indexOf('package-3'));
            done();
        }).catch(e => {
            done(e);
        });
    });

});