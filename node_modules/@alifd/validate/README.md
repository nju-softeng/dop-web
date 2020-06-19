# Validate

<p align="center">
  <a href="https://www.npmjs.org/package/@alifd/validate"><img src="https://img.shields.io/npm/v/@alifd/validate.svg"></a>
  <a href="https://www.npmjs.org/package/@alifd/validate"><img src="https://img.shields.io/npm/dm/@alifd/validate.svg"></a>
  <a href="https://codecov.io/gh/alibaba-fusion/validate"><img src="https://codecov.io/gh/alibaba-fusion/validate/branch/master/graph/badge.svg"></a>
  <a href="https://travis-ci.com/alibaba-fusion/validate"><img src="https://travis-ci.com/alibaba-fusion/validate.svg?branch=master"></a>
  <a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a>
  <a href="https://github.com/alibaba-fusion/validate/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-brightgreen.svg"></a>
  <a href="https://github.com/semantic-release/semantic-release"><img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg"></a>
</p>


Validation to be used with @alifd/field
Install with `npm install @alifd/validate`

### Basic Usage

#### Callback
```
const rules = {
  myInput: function (rule, value, cb, options) {
    if (value <= 100) {
      cb('Value must be more than 100');
    } else {
      cb();
    }
  }
}
const validator = new Validator(rules);
validator.validate({ myInput: 90 }, (err) => { console.log(err)});
```

#### Promise
```
const rules = {
  myInput: function (rule, value, cb, options) {
    if (value <= 100) {
      cb('Value must be more than 100');
    } else {
      cb();
    }
  }
}
const validator = new Validator(rules);
validator.validatePromise({ myInput: 90 })
  .then((err) => { console.log(err)})
```

## API
### Initialization
```
let validator = new Validator(rules [, options]);
```

|Parameter | Description | Type | Optional |Default |
|-----------|------------------------------------------|------------|-------|--------|
| rules | Map of rule names to validation functions | { [ruleName] : Array of validation functions } | yes | undefined
| options | validation options | Object | yes | {} |

`options` configuration item

| Parameters | Description | Type |Default |
|-----------|------------------------------------------|-----------|--------|
| first | should only return the first error found amongst rules | Boolean | undefined
| messages | map to override default messages | Object | (see ./src/messages)



## Development

### Testing
`npm run test` - triggers a one-time full run of all unit tests
`npm run test-watch` - triggers a run of all unit tests, but watches for any changes to code or tests and reruns all tests.


### Making commits
Commits must be in the following format `TYPE(SCOPE): MESSAGE`, where `SCOPE` is optional.
e.g. `fix: validatePromise return value`
Review the `commitlint.config.js` file to see allowed types.

### Release
There are 2 main branches: Master and Develop. Master holds the latest code that is contained in the npm package. Develop is the development branch used for queueing package changes and any final validation. All development should occur on another branch and then be merged into Develop. 

Travis CI will run tests on each pull request and push. If the push is to master then an additional release step runs. The release step uses `semantic-release` to determine the correct version, tag the master branch, and release the new package to npm. 

NOTE: the package.json file needs to be updated manually after the release.