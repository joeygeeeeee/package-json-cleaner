export default function getPackageList(file) {
    return Object.keys(file.dependencies).concat(Object.keys(file.devDependencies));
}