import assert from 'assert';

import getPackageUsages from '../../lib/get-package-usages';

describe('Get package usages', () => {

    it('Should return a list of package usages', (done) => {
        getPackageUsages(`${__dirname}/test-directory`, ['package-1', 'package-2']).then((usages) => {
            assert.deepEqual(Object.keys(usages), ['package-1', 'package-2']);
            done();
        }).catch(e => {
            done(e);
        });
    });

});