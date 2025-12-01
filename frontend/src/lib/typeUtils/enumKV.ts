export function getEnumKeyByValue<T extends { [index: string]: string }>(
	myEnum: T,
	enumValue: string
): keyof T | undefined {
	for (const key in myEnum) {
		if (myEnum[key] === enumValue) {
			return key as keyof T;
		}
	}
	return undefined;
}