import { Body, Controller, Post } from '@nestjs/common'

import { AuthService } from '@/modules/auth/auth.service'

import { RefreshTokenDto } from '@/dto/token.dto'
import { CreateUserDto, LoginUserDto } from '@/dto/user.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	registerUser(@Body() dto: CreateUserDto) {
		return this.authService.registerUser(dto)
	}

	@Post('login')
	loginUser(@Body() dto: LoginUserDto) {
		return this.authService.loginUser(dto)
	}

	@Post('refresh')
	refreshToken(@Body() refreshToken: RefreshTokenDto) {
		return this.authService.refreshToken(refreshToken)
	}
}
