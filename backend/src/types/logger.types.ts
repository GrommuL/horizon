export type LogLevels = 'error' | 'warn' | 'info' | 'debug' | 'verbose'

export type LogContext = string | undefined

export type LogMessage = {
	level: LogLevels
	message: string
	context?: string
	timestamp?: string
}
