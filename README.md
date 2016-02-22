# package-json-cleaner
A nifty interactive cli tool to crawl through your code and find unused modules
```bash
sudo npm install -g package-json-cleaner
```
then
```bash
cd project-root
```
and then
```bash
package-json-cleaner
```
At the moment package-json-cleaner considers `require("something");` and `import something from 'something';` to be valid usages of a module. If it finds modules from your `package.json` that are mentioned in other string constants it will ask you if it is a valid usage or not.
