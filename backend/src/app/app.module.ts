import { Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'

import { DatabaseModule } from '@/database/database.module'

import { LoggerModule } from '@/logger/logger.module'
import { AppLoggerService } from '@/logger/logger.service'

import { AllExceptionsFilter } from '@/common/filters/all-exceptions.filter'
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor'

@Module({
	imports: [LoggerModule, DatabaseModule],
	controllers: [],
	providers: [
		AppLoggerService,
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggingInterceptor
		}
	]
})
export class AppModule {}
