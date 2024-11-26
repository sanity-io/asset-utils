# Changelog

## [2.2.1](https://github.com/sanity-io/asset-utils/compare/v2.2.0...v2.2.1) (2024-11-26)


### Bug Fixes

* support custom CDNs in `getIdFromString` ([#45](https://github.com/sanity-io/asset-utils/issues/45)) ([8e88a60](https://github.com/sanity-io/asset-utils/commit/8e88a602600bdb4c57a231f2d15f58374dc7751e))

## [2.2.0](https://github.com/sanity-io/asset-utils/compare/v2.1.0...v2.2.0) (2024-11-14)


### Features

* add regex pattern for custom cdn urls ([#43](https://github.com/sanity-io/asset-utils/issues/43)) ([211f387](https://github.com/sanity-io/asset-utils/commit/211f38794fcb7dca38387f89c36d21e32254e6c3))

## [2.1.0](https://github.com/sanity-io/asset-utils/compare/v2.0.7...v2.1.0) (2024-11-04)


### Features

* allow specifying custom baseUrl in image/file URL builders ([#41](https://github.com/sanity-io/asset-utils/issues/41)) ([146bc23](https://github.com/sanity-io/asset-utils/commit/146bc237e1e6ba9580db862ad54998fb1827c157))

## [2.0.7](https://github.com/sanity-io/asset-utils/compare/v2.0.6...v2.0.7) (2024-10-31)


### Bug Fixes

* correct return values for `try*` functions ([1cca70d](https://github.com/sanity-io/asset-utils/commit/1cca70d2bfebc9345ba17807aafeb52d807c82b2))

## [2.0.6](https://github.com/sanity-io/asset-utils/compare/v2.0.5...v2.0.6) (2024-10-03)


### Bug Fixes

* rename docs script to be more precise ([3920c25](https://github.com/sanity-io/asset-utils/commit/3920c250e922112a04886d2e6afdac202ab796e5))

## [2.0.5](https://github.com/sanity-io/asset-utils/compare/v2.0.4...v2.0.5) (2024-10-03)


### Bug Fixes

* (ci): use correct token for github pages ([8180702](https://github.com/sanity-io/asset-utils/commit/818070286a045aa8c3f964bafdc064e416c90279))
* improve commit message for readme generation ([10fcede](https://github.com/sanity-io/asset-utils/commit/10fcede0f71ddc93ad94156aea37c657643b4018))

## [2.0.4](https://github.com/sanity-io/asset-utils/compare/v2.0.3...v2.0.4) (2024-10-03)


### Bug Fixes

* include latest, generated readme in published module ([ddd3dfe](https://github.com/sanity-io/asset-utils/commit/ddd3dfef1912e1f0201fbe0092f4ea17e0fc7fd0))

## [2.0.3](https://github.com/sanity-io/asset-utils/compare/v2.0.2...v2.0.3) (2024-10-03)


### Bug Fixes

* remove unnecessary prepublish step ([fe1e393](https://github.com/sanity-io/asset-utils/commit/fe1e3936b37c5fd3fe91d9ad50807c98f7fca58b))

## [2.0.2](https://github.com/sanity-io/asset-utils/compare/v2.0.1...v2.0.2) (2024-10-03)


### Bug Fixes

* clarify that the module is synchronous, no async calls for information ([a8894c4](https://github.com/sanity-io/asset-utils/commit/a8894c42b95d48ce4dd2df765d0618a61d95689b))
* prevent readme template from being published ([49c6feb](https://github.com/sanity-io/asset-utils/commit/49c6feb8fe8481236f2562038f5e9aee83df2990))

## [2.0.1](https://github.com/sanity-io/asset-utils/compare/v2.0.0...v2.0.1) (2024-10-03)


### Bug Fixes

* **docs:** correct links to html documentation ([a872adf](https://github.com/sanity-io/asset-utils/commit/a872adfb493e81c1be351f6888f39e9a2620452e))
* **docs:** correct links to readme sections ([b946af2](https://github.com/sanity-io/asset-utils/commit/b946af2f009da613932d755bb3c3e4e08851ec75))
* **docs:** sort members by kind - functions first ([a12ce9e](https://github.com/sanity-io/asset-utils/commit/a12ce9ef34644f9289cde0a4c33e5db9411852fc))

## [2.0.0](https://github.com/sanity-io/asset-utils/compare/v1.3.2...v2.0.0) (2024-10-03)


### ⚠ BREAKING CHANGES

* Remove `isObject` method from exported functions.

### Features

* modernize tooling, switch to ESM by default, require node 18 ([b432ddc](https://github.com/sanity-io/asset-utils/commit/b432ddc2089757437ba0016ff34376d2a4559736))


### Bug Fixes

* make docs generation compatible with latest typedoc ([517695b](https://github.com/sanity-io/asset-utils/commit/517695b82fa675ee03409cd78c1887ed4a2a28b4))
* typos in tsdocs ([b856d1a](https://github.com/sanity-io/asset-utils/commit/b856d1a920d90abe4edad544efcbf6e6513ac0a3))
