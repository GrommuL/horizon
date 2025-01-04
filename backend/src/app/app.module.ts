import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'

import { AuthModule } from '@/modules/auth/auth.module'
import { TokenModule } from '@/modules/token/token.module'
import { UsersModule } from '@/modules/users/users.module'

import { DatabaseModule } from '@/database/database.module'

import { LoggerModule } from '@/logger/logger.module'
import { AppLoggerService } from '@/logger/logger.service'

import { IS_DEV_ENV } from '@/common/constants/is-dev.constant'
import { AllExceptionsFilter } from '@/common/filters/all-exceptions.filter'
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor'

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true
		}),
		LoggerModule,
		DatabaseModule,
		TokenModule,
		AuthModule,
		UsersModule
	],
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
