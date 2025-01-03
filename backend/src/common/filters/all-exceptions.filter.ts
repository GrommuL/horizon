import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'

import { AppLoggerService } from '@/logger/logger.service'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	constructor(private readonly logger: AppLoggerService) {}

	catch(exception: unknown, host: ArgumentsHost): void {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const request = ctx.getRequest<Request>()

		const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

		const message = exception instanceof HttpException ? exception.getResponse() : 'Internal server error'

		this.logger.error(
			`HTTP Status: ${status} - Error: ${JSON.stringify(message)}`,
			exception instanceof Error ? exception.stack : undefined,
			request.url
		)

		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			message
		})
	}
}
