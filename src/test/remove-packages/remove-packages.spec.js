import assert from 'assert';
import removePackages from '../../lib/remove-packages';
import jsonfile from 'jsonfile';
describe('Remove packages from package.json', () => {

    it('Should remove the specified packages from the package.json file', () => {

        var file = jsonfile.readFileSync(`${__dirname}/_test_package.json`);
        var resultFile = jsonfile.readFileSync(`${__dirname}/_test_result_package.json`);

        assert.deepEqual(removePackages(file, ['package-1', 'package-3']), resultFile);
    });

});