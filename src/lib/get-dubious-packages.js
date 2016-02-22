import R from 'ramda';

export default function getDubiousPackages(packageUsages, rules) {

    var listOfPredicates = R.map(rule => R.compose(R.length, R.match(rule)), rules);
    var passesAnyRules = R.anyPass(listOfPredicates);
    var anyPassAllRules = R.any(passesAnyRules);
    var noneDubiousUsage = R.compose(anyPassAllRules, R.map(pkg => R.prop('usage', pkg)));
    return R.reject(noneDubiousUsage, packageUsages);
}