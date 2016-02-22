import assert from 'assert';

import getUnusedPackages from '../../lib/get-unused-packages';

describe('Get unused packages usages', () => {

    it('Should return a list of unused package usages', () => {

        assert.deepEqual(
            getUnusedPackages({'package-1': {}, 'package-3': {}}, ['package-1', 'package-2', 'package-3', 'package-4']),
            ['package-2', 'package-4']
        );

    });

});