import {liba} from '@mrck-labs/lib-a'

import {noReleaseTypescript} from '@mrck-labs/lib-c-non-releasable-typescript'

export const someFunc = () => {
    noReleaseTypescript()
    liba()
    return "somefunc value"
}

export * from "./logger/createLogger"
export * from './env-detection'