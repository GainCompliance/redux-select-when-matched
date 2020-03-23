# redux-select-when-matched

resolves a promise with your chosen selection from state when the state allows your predicate to return true

<!-- status badges -->
[![Build Status][ci-badge]][ci-link]
[![Codecov][coverage-badge]][coverage-link]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

* [redux-select-when-matched](#redux-select-when-matched)
  * [Usage](#usage)
    * [Installation](#installation)
    * [Initialization](#initialization)
    * [Subscribing to state changes](#subscribing-to-state-changes)
    * [API](#api)
      * [`subscribe`](#subscribe)
          * [`store` (__required__)](#store-__required__)
          * [`predicate` (__required__)](#predicate-__required__)
          * [`selector` (__required__)](#selector-__required__)
  * [Contributing](#contributing)
    * [Dependencies](#dependencies)
    * [Verification](#verification)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage

<!-- consumer badges -->
[![npm][npm-badge]][npm-link]
[![MIT license][license-badge]][license-link]

### Installation

```sh
$ npm install redux-select-when-matched --prod
```

### Subscribing to state changes

```js
import selectWhenMatched from 'redux-select-when-matched';
import {createStore} from 'redux';
import {isLoaded, getResource} from 'duck';

const store = createStore(reducer);
const predicate = state => isLoaded(state, 'foo-type', id);
const selector = state => getResource(state, 'foo-type', id);

selectWhenMatched(store, predicate, selector).then(selectedDetailsFromState => {
  // do what you need to with the details that are now available from state
});
```

### API

#### `subscribe`

requires the raw redux `store`, `predicate` and `selector` for the subscription

##### `store` (__required__)

your redux store object

##### `predicate` (__required__)

accepts the new state as input, allowing you to inspect and return a boolean
informing whether or not the promise for this subscription should be resolved

##### `selector` (__required__)

accepted the new state as input, allowing you to select within it to return
the subset of state that your subscriber desires

## Contributing

<!-- contribution badges -->
[![Conventional Commits][commit-convention-badge]][commit-convention-link]
[![Commitizen friendly][commitizen-badge]][commitizen-link]
[![semantic-release][semantic-release-badge]][semantic-release-link]
[![PRs Welcome][PRs-badge]][PRs-link]
[![Greenkeeper badge](https://badges.greenkeeper.io/GainCompliance/redux-select-when-matched.svg)](https://greenkeeper.io/)

### Dependencies

```sh
$ nvm install
$ npm install
```

### Verification

```sh
$ npm test
```

[npm-link]: https://www.npmjs.com/package/redux-select-when-matched
[npm-badge]: https://img.shields.io/npm/v/redux-select-when-matched.svg
[license-link]: LICENSE
[license-badge]: https://img.shields.io/github/license/GainCompliance/redux-select-when-matched.svg
[ci-link]: https://travis-ci.com/GainCompliance/redux-select-when-matched
[ci-badge]: https://img.shields.io/travis/com/GainCompliance/redux-select-when-matched.svg?branch=master
[coverage-link]: https://codecov.io/github/GainCompliance/redux-select-when-matched
[coverage-badge]: https://img.shields.io/codecov/c/github/GainCompliance/redux-select-when-matched.svg
[commit-convention-link]: https://conventionalcommits.org
[commit-convention-badge]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg
[commitizen-link]: http://commitizen.github.io/cz-cli/
[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[semantic-release-link]: https://github.com/semantic-release/semantic-release
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[PRs-link]: http://makeapullrequest.com
[PRs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
