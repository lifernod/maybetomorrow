import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param => {
	try {
		Number.parseInt(param);
		return true;
	} catch (_) {
		return false;
	}
});