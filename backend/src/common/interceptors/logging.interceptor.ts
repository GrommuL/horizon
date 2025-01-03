import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { AppLoggerService } from '@/logger/logger.service'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	constructor(private readonly logger: AppLoggerService) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const req = context.switchToHttp().getRequest()
		const method = req.method
		const url = req.url

		const startTime = Date.now()

		return next.handle().pipe(
			tap(() => {
				const responseTime = Date.now() - startTime
				this.logger.log(`[${method}] ${url} - ${responseTime}ms`)
			})
		)
	}
}
