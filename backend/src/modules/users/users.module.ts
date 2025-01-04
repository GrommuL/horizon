import { Module } from '@nestjs/common'

import { UsersController } from '@/modules/users/users.controller'
import { UsersService } from '@/modules/users/users.service'

import { DatabaseService } from '@/database/database.service'

@Module({
	controllers: [UsersController],
	providers: [UsersService, DatabaseService],
	exports: [UsersService]
})
export class UsersModule {}
