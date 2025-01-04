import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { JwtPayload, JwtUser } from '@/types/jwt.types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow<string>('JWT_SECRET')
		})
	}

	async validate(payload: JwtPayload): Promise<JwtUser> {
		return { ...payload.user }
	}

	// async validate(payload: any) {
	//   const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
	//   return { userId: payload.sub, email: payload.email, role: user.role };
	// }
}
