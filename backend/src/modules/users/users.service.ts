import { ConflictException, Injectable } from '@nestjs/common'
import { genSalt, hash } from 'bcrypt'

import { DatabaseService } from '@/database/database.service'

import { CreateUserDto } from '@/dto/user.dto'

@Injectable()
export class UsersService {
	constructor(private readonly database: DatabaseService) {}

	async createUser(dto: CreateUserDto) {
		const { username, email, password } = dto

		const isUserExist = await this.database.user.findUnique({ where: { email } })

		if (isUserExist) {
			throw new ConflictException('A user with this email already exists')
		}

		const passwordSalt = await genSalt()
		const hashedPassword = await hash(password, passwordSalt)

		const createdUser = await this.database.user.create({ data: { username, email, password: hashedPassword } })

		return createdUser
	}

	async getUserByEmail(email: string) {
		return this.database.user.findUnique({ where: { email } })
	}

	async getUserById(id: string) {
		return this.database.user.findUnique({ where: { id } })
	}
}
