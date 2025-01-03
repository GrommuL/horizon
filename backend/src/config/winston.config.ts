import * as chalk from 'chalk'
import * as winston from 'winston'

import { LogLevels } from '@/types/logger.types'

const colors: Record<LogLevels, chalk.Chalk> = {
	error: chalk.red,
	warn: chalk.yellow,
	info: chalk.green,
	debug: chalk.blue,
	verbose: chalk.cyan
}

const customFormat = winston.format.printf(({ level, message, context, timestamp }) => {
	const colorizedLevel = colors[level](`[ ${level.toUpperCase()} ]`)
	const colorizedContext = context ? chalk.magenta(`[ ${context} ]`) : ''
	const colorizedTimestamp = chalk.gray(`[ ${timestamp} ]`)

	return `${colorizedTimestamp} ${colorizedLevel} ${colorizedContext} ${message}`
})

export const winstonConfig: winston.LoggerOptions = {
	level: 'debug',
	format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), customFormat),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'logs/errors.log', level: 'error' }),
		new winston.transports.File({ filename: 'logs/all.log' })
	]
}
