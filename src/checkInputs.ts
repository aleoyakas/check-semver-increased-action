import checkIsValidSemVer from './checkIsValidSemVer'

const getSummary = (isValid: boolean): string =>
  isValid ? 'is valid' : 'is not valid'

type Output =
  | { isValid: true; summary?: undefined }
  | { isValid: false; summary: string }

const checkInputs = (
  currentVersion: string,
  previousVersion: string,
  allowPreRelease: boolean
): Output => {
  const isCurrentVersionValid = checkIsValidSemVer(
    currentVersion,
    allowPreRelease
  )
  const isPreviousVersionValid = checkIsValidSemVer(previousVersion, true)

  if (isCurrentVersionValid && isPreviousVersionValid) {
    return { isValid: true }
  }

  return {
    isValid: false,
    summary: `currentVersion ${getSummary(
      isCurrentVersionValid
    )}. previousVersion ${getSummary(isPreviousVersionValid)}.`
  }
}

export default checkInputs
