import semver from 'semver'

const compareVersions = (
  currentVersion: string,
  previousVersion: string
): boolean => semver.gt(currentVersion, previousVersion)

export default compareVersions
