import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from '@/app/app.module'

import { AppLoggerService } from '@/logger/logger.service'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const logger = app.get(AppLoggerService)
	const config = app.get(ConfigService)

	app.useLogger(logger)

	app.useGlobalPipes(new ValidationPipe())

	app.enableCors({
		origin: config.getOrThrow<string>('ALLOWED_ORIGIN').split(','),
		credentials: true,
		exposedHeaders: ['set-cookie']
	})

	await app.listen(config.getOrThrow<number>('BACKEND_PORT'))
}
bootstrap()
