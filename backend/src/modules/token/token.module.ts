import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { TokenService } from '@/modules/token/token.service'

import { JwtStrategy } from '@/strategy/jwt.strategy'

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt', property: 'user', session: false }),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.getOrThrow<string>('JWT_SECRET'),
				signOptions: { expiresIn: configService.getOrThrow<string>('JWT_EXPIRES_IN') }
			}),
			inject: [ConfigService]
		})
	],
	providers: [TokenService, JwtStrategy],
	exports: [TokenService]
})
export class TokenModule {}
