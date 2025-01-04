export type JwtPayload = {
	user: JwtUser
	iat: number
	exp: number
}

export type JwtUser = {
	email: string
	username: string
}

export type JwtResponse = {
	access_token: string
	refresh_token: string
}
