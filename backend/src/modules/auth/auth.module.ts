import { Module } from '@nestjs/common'

import { AuthController } from '@/modules/auth/auth.controller'
import { AuthService } from '@/modules/auth/auth.service'
import { TokenModule } from '@/modules/token/token.module'
import { UsersModule } from '@/modules/users/users.module'

import { DatabaseService } from '@/database/database.service'

@Module({
	imports: [UsersModule, TokenModule],
	controllers: [AuthController],
	providers: [AuthService, DatabaseService]
})
export class AuthModule {}
