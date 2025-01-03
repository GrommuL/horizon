import { Injectable, LoggerService } from '@nestjs/common'
import { createLogger, Logger } from 'winston'

import { winstonConfig } from '@/config/winston.config'

import { LogContext } from '@/types/logger.types'

@Injectable()
export class AppLoggerService implements LoggerService {
	private readonly logger: Logger

	constructor() {
		this.logger = createLogger(winstonConfig)
	}

	log(message: string, context?: LogContext): void {
		this.logger.info(message, { context })
	}

	error(message: string, trace?: string, context?: LogContext): void {
		this.logger.error(message, { trace, context })
	}

	warn(message: string, context?: LogContext): void {
		this.logger.warn(message, { context })
	}

	debug(message: string, context?: LogContext): void {
		this.logger.debug(message, { context })
	}

	verbose(message: string, context?: LogContext): void {
		this.logger.verbose(message, { context })
	}
}
