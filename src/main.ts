import * as core from '@actions/core'
import checkInputs from './checkInputs'
import compareVersions from './compareVersions'

export async function run(): Promise<void> {
  try {
    const currentVersion = core.getInput('current-version')
    const previousVersion = core.getInput('previous-version')
    const allowPreRelease =
      core.getInput('allow-pre-release').toLowerCase() === 'true'

    const { isValid, summary } = checkInputs(
      currentVersion,
      previousVersion,
      allowPreRelease
    )
    if (!isValid) {
      core.setFailed(summary)
    }

    const isVersionIncreased = compareVersions(currentVersion, previousVersion)
    core.setOutput('is-version-increased', isVersionIncreased)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
