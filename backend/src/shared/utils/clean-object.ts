export function cleanObject<T extends Record<string, unknown>>(fields: T): Partial<T> {
	const emptyString = ''
	const result: Partial<T> = {}

	for (const key in fields) {
		if (Object.prototype.hasOwnProperty.call(fields, key)) {
			if (fields[key] !== emptyString && fields[key] !== undefined) {
				result[key] = fields[key]
			}
		}
	}

	return result
}
