import pino from 'pino'
import pretty from 'pino-pretty'

const logger = pino(pretty())

interface LoggerArgs {
    level: string
    name: string
}

export const createLogger = (args: LoggerArgs) => {
    const { level, name } = args
    return pino({
        name,
        level,
    })
}