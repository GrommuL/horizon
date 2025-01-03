import { NestFactory } from '@nestjs/core'

import { AppModule } from '@/app/app.module'

import { AppLoggerService } from '@/logger/logger.service'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const logger = app.get(AppLoggerService)

	app.useLogger(logger)

	await app.listen(3000)
}
bootstrap()
