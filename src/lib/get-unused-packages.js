import R from 'ramda';

export default function getUnusedPackages(packageUsages, packageList) {
    var packagesUsed = R.keys(packageUsages);
    return R.filter(pkg => !R.contains(pkg, packagesUsed), packageList);
}