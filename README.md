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
name: front-end-checks

on:
  workflow_call:
    inputs:
      target-branch:
        required: true
        type: string

jobs:
  check-package-version:
    runs-on: ubuntu-latest
    steps:
      - name: get-current-version
        id: current-version
        uses: ...

      - name: get-previous-version
        id: previous-version
        uses: ...

      - name: Check Version
        uses: aleoyakas/check-semver-increased-action@v1
        id: check-version
        with:
          current-version: ${{ steps.current-version.outputs.version }}
          previous-version: ${{ steps.previous-version.outputs.version }}

      - name: Echo Success
        if: steps.action.outputs.is-version-increased == 'true'
        run: echo Version has increased
```
