export function removeObjectKeys<T extends Record<string, T[keyof T]>, K extends keyof T>(original: T, keysToExclude: K[]) {
	const result: Partial<T> = {}

	if (keysToExclude.length === 0) {
		return original
	}

	const validatedKeysToExclude = new Set(keysToExclude)

	// for (const key in original) {
	// 	if (Object.prototype.hasOwnProperty.call(original, key)) {
	// 		if (!validatedKeysToExclude.has(key as K)) {
	// 			result[key] = original[key]
	// 		}
	// 	}
	// }
	for (const [key, value] of Object.entries(original)) {
		if (!validatedKeysToExclude.has(key as K)) {
			result[key as keyof T] = value
		}
	}

	return result
}
