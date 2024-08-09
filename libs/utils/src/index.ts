import {liba} from '@mrck-labs/lib-a'

import {noRelease} from '@mrck-labs/lib-b-non-releasable'
import {noReleaseTypescript} from '@mrck-labs/lib-c-non-releasable-typescript'

export const someFunc = () => {
    noRelease()
    noReleaseTypescript()
    liba()
    return "somefunc value"
}

export * from "./logger/createLogger"
export * from './env-detection'