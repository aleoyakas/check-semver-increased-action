import semver from 'semver'

const checkIsValidSemVer = (
  version: string,
  allowPreRelease?: boolean
): boolean => {
  if (!allowPreRelease && !!semver.prerelease(version)) {
    return false
  }
  return !!semver.valid(version)
}

export default checkIsValidSemVer
