import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator'

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@Matches(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/)
	username: string

	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string

	@IsString()
	@IsNotEmpty()
	@MinLength(8) //Добавить regexp для валидации пароля 8 символов одна заглавная и один спец.символ
	password: string
}

export class LoginUserDto {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string

	@IsString()
	@IsNotEmpty()
	@MinLength(8) //Добавить regexp для валидации пароля 8 символов одна заглавная и один спец.символ
	password: string
}
