import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { compare } from 'bcrypt'

import { TokenService } from '@/modules/token/token.service'
import { UsersService } from '@/modules/users/users.service'

import { removeObjectKeys } from '@/shared/utils/remove-object-keys'

import { JwtPayload } from '@/types/jwt.types'

import { RefreshTokenDto } from '@/dto/token.dto'
import { CreateUserDto, LoginUserDto } from '@/dto/user.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly tokenService: TokenService
	) {}

	async registerUser(dto: CreateUserDto) {
		const createdUser = await this.userService.createUser(dto)

		const payload = {
			username: dto.username,
			email: dto.email
		}

		const tokens = await this.tokenService.generateJwtToken(payload)

		const userWithoutPassword = removeObjectKeys(createdUser, ['password'])

		return { user: userWithoutPassword, access_token: tokens.access_token, refresh_token: tokens.refresh_token }
	}

	async loginUser(dto: LoginUserDto) {
		const { email, password } = dto

		const user = await this.userService.getUserByEmail(email)

		if (!user) {
			throw new BadRequestException('User with this email not found')
		}

		const comparedPassword = await compare(password, user.password)

		if (!comparedPassword) {
			throw new BadRequestException('Incorrect password')
		}

		const payload = {
			username: user.username,
			email: user.email
		}

		const tokens = await this.tokenService.generateJwtToken(payload)

		const userWithoutPassword = removeObjectKeys(user, ['password'])

		return { user: userWithoutPassword, access_token: tokens.access_token, refresh_token: tokens.refresh_token }
	}

	async refreshToken(dto: RefreshTokenDto) {
		const { refresh_token } = dto

		try {
			const payload: JwtPayload = this.tokenService.validateRefreshToken(refresh_token)

			const user = await this.userService.getUserByEmail(payload.user.email)

			if (!user) {
				throw new UnauthorizedException('User with this email not found')
			}

			const tokens = await this.tokenService.generateJwtToken(payload.user)

			const userWithoutPassword = removeObjectKeys(user, ['password'])

			return { user: userWithoutPassword, access_token: tokens.access_token, refresh_token: tokens.refresh_token }
		} catch (error) {
			throw new UnauthorizedException('Invalid refresh token')
		}
	}
}
