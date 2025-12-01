export type CamelToSnake<S extends string> = S extends `${infer C}${infer Rest}`
	? C extends Lowercase<C>
		? `${C}${CamelToSnake<Rest>}`
		: `_${Lowercase<C>}${CamelToSnake<Rest>}`
	: S;

export type CamelKeysToSnake<T> = {
	[K in keyof T as K extends string ? CamelToSnake<K> : K]: T[K];
};
