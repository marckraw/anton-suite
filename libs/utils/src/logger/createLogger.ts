import pino from 'pino'

export const createLogger = (context: string, level: string = 'info') => {
    return pino({
        level,
        name: context,
    })
};
