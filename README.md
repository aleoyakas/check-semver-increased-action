# Check SemVer Increased Action

This action checks that the Semantic Version of the software has increased
relative to a previous version.

More info on SemVer is available [here](https://semver.org/).

## Inputs

### `current-version`

**Required `(string)`** - The current Semantic Version of your application. The
workflow will fail if the string supplied is not a valid SemVer or you have
supplied a pre-release version an `allow-pre-releases` has not been set to
`True`.

### `previous-version`

**Required `(string)`** - The previous version of your application. The workflow
will fail if the string supplied is not a valid SemVer.

### `allow-pre-release`

**`(True | False)`** - Determines if the `current-version` can be a pre-release
version. Defaults to `False`.

## Outputs

### `is-version-increased`

**`(True | False)`** -`True` if the `current-version` is higher than the
`previous-version`. `False` if the `current-version` is less than or equal to
the `previous-version`

## Example usage

```yaml
uses: aleoyakas/check-version-increased-action
with:
  current-version: 3.1.1
  previous-version: 3.1.0
```
