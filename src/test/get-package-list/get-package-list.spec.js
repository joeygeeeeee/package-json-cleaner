import assert from 'assert';
import getPackageList from '../../lib/get-package-list';
import jsonfile from 'jsonfile';

describe('Get package list', () => {

    it('Should return an array of package names contained in package.json file', () => {
        var file = jsonfile.readFileSync(`${__dirname}/_test_package.json`);

        assert.deepEqual(
            getPackageList(file),
            ['package-1', 'package-2', 'package-3', 'dev-package-1', 'dev-package-2', 'dev-package-3']
        );
    });

});