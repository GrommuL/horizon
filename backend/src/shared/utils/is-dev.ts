import { ConfigService } from '@nestjs/config'
import * as dotenv from 'dotenv'

dotenv.config()

export function isDev(configService: ConfigService) {
	return configService.getOrThrow<string>('NODE_ENV') === 'development'
}
