import * as core from '@actions/core'
import * as main from '../src/main'

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

let errorMock: jest.SpyInstance
let getInputMock: jest.SpyInstance
let setFailedMock: jest.SpyInstance
let setOutputMock: jest.SpyInstance

type MockedInputs = {
  currentVersion?: string
  previousVersion?: string
  allowPreRelease?: boolean
}

const getMockedInputs =
  ({
    currentVersion = '',
    previousVersion = '',
    allowPreRelease = false
  }: MockedInputs) =>
  (name: string): string => {
    switch (name) {
      case 'current-version':
        return currentVersion
      case 'previous-version':
        return previousVersion
      case 'allow-pre-release':
        return `${allowPreRelease}`
      default:
        return ''
    }
  }

describe('check-semver-increased-action', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    errorMock = jest.spyOn(core, 'error').mockImplementation()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
    setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
    setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()
  })

  test('the action completed with `is-version-increased` set to `false` if the versions are equal', async () => {
    getInputMock.mockImplementation(
      getMockedInputs({ currentVersion: '3.2.1', previousVersion: '3.2.1' })
    )

    await main.run()
    expect(runMock).toHaveReturned()
    expect(setOutputMock).toHaveBeenCalledWith('is-version-increased', false)
    expect(errorMock).not.toHaveBeenCalled()
  })

  test('the action completed with `is-version-increased` set to `false` if `current-version` is less than `previous-version`', async () => {
    getInputMock.mockImplementation(
      getMockedInputs({ currentVersion: '3.2.0', previousVersion: '3.2.1' })
    )

    await main.run()
    expect(runMock).toHaveReturned()
    expect(setOutputMock).toHaveBeenCalledWith('is-version-increased', false)
    expect(errorMock).not.toHaveBeenCalled()
  })

  test('the action completed with `is-version-increased` set to `true` if `current-version` is greater than `previous-version`', async () => {
    getInputMock.mockImplementation(
      getMockedInputs({ currentVersion: '3.2.1', previousVersion: '3.2.0' })
    )

    await main.run()
    expect(runMock).toHaveReturned()
    expect(setOutputMock).toHaveBeenCalledWith('is-version-increased', true)
    expect(errorMock).not.toHaveBeenCalled()
  })

  test('the action fails when `current-version` is invalid', async () => {
    getInputMock.mockImplementation(
      getMockedInputs({ currentVersion: 'abc', previousVersion: '3.2.1' })
    )

    await main.run()
    expect(runMock).toHaveReturned()
    expect(setFailedMock).toHaveBeenCalledWith(
      'currentVersion is not valid. previousVersion is valid.'
    )
  })

  test('the action fails when `previous-version` is invalid', async () => {
    getInputMock.mockImplementation(
      getMockedInputs({ currentVersion: '3.2.1', previousVersion: 'abc' })
    )

    await main.run()
    expect(runMock).toHaveReturned()
    expect(setFailedMock).toHaveBeenCalledWith(
      'currentVersion is valid. previousVersion is not valid.'
    )
  })

  test('the action fails when both version are invalid', async () => {
    getInputMock.mockImplementation(
      getMockedInputs({ currentVersion: 'abc', previousVersion: 'efg' })
    )

    await main.run()
    expect(runMock).toHaveReturned()
    expect(setFailedMock).toHaveBeenCalledWith(
      'currentVersion is not valid. previousVersion is not valid.'
    )
  })

  test('the action fails when a pre-release version is supplied for the `current-version` and `allow-pre-release` has not been set', async () => {
    getInputMock.mockImplementation(
      getMockedInputs({
        currentVersion: '3.2.1-alpha.1',
        previousVersion: '3.2.0'
      })
    )

    await main.run()
    expect(runMock).toHaveReturned()
    expect(setFailedMock).toHaveBeenCalledWith(
      'currentVersion is not valid. previousVersion is valid.'
    )
  })

  test('the action completes successfully when a pre-release is supplied for the `current-version` and `allow-pre-release` has been set to `true`', async () => {
    getInputMock.mockImplementation(
      getMockedInputs({
        currentVersion: '3.2.1-alpha.1',
        previousVersion: '3.2.0',
        allowPreRelease: true
      })
    )

    await main.run()
    expect(runMock).toHaveReturned()
    expect(setOutputMock).toHaveBeenCalledWith('is-version-increased', true)
    expect(errorMock).not.toHaveBeenCalled()
  })

  test('the action completes successfully when a pre-release is supplied for the `previous-version` and `allow-pre-release` has not been set', async () => {
    getInputMock.mockImplementation(
      getMockedInputs({
        currentVersion: '3.2.1',
        previousVersion: '3.2.0-alpha.1'
      })
    )

    await main.run()
    expect(runMock).toHaveReturned()
    expect(setOutputMock).toHaveBeenCalledWith('is-version-increased', true)
    expect(errorMock).not.toHaveBeenCalled()
  })
})
