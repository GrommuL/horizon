import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { JwtResponse, JwtUser } from '@/types/jwt.types'

@Injectable()
export class TokenService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async generateJwtToken(user: JwtUser): Promise<JwtResponse> {
		const payload = { user }

		return {
			access_token: this.jwtService.sign(payload, { secret: this.configService.getOrThrow<string>('JWT_SECRET') }),
			refresh_token: this.jwtService.sign(payload, {
				secret: this.configService.getOrThrow<string>('JWT_SECRET'),
				expiresIn: this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRES_IN')
			})
		}
	}

	validateRefreshToken(refresh_token: string) {
		return this.jwtService.verify(refresh_token)
	}
}
