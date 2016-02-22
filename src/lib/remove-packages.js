export default function removePackages(file, packages) {

    packages.forEach((pkg) => {
        if (file.dependencies[pkg]) {
            delete file.dependencies[pkg]
        } else if (file.devDependencies[pkg]) {
            delete file.devDependencies[pkg]
        }
    });

    return file;
}