
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```sh
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const LANGUAGE: string;
	export const USER: string;
	export const npm_config_user_agent: string;
	export const XDG_SEAT: string;
	export const XDG_SESSION_TYPE: string;
	export const npm_node_execpath: string;
	export const SHLVL: string;
	export const HOME: string;
	export const DESKTOP_SESSION: string;
	export const npm_package_json: string;
	export const COREPACK_ROOT: string;
	export const XDG_SEAT_PATH: string;
	export const GTK_MODULES: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const CINNAMON_VERSION: string;
	export const COLORTERM: string;
	export const GNOME_KEYRING_CONTROL: string;
	export const OMF_PATH: string;
	export const COREPACK_ENABLE_DOWNLOAD_PROMPT: string;
	export const LOGNAME: string;
	export const pnpm_config_verify_deps_before_run: string;
	export const XDG_SESSION_CLASS: string;
	export const npm_config_registry: string;
	export const XDG_SESSION_ID: string;
	export const TERM: string;
	export const GNOME_DESKTOP_SESSION_ID: string;
	export const npm_config_node_gyp: string;
	export const PATH: string;
	export const SESSION_MANAGER: string;
	export const GDM_LANG: string;
	export const GTK3_MODULES: string;
	export const npm_package_name: string;
	export const NODE: string;
	export const GNOME_TERMINAL_SCREEN: string;
	export const XDG_SESSION_PATH: string;
	export const XDG_RUNTIME_DIR: string;
	export const npm_config_frozen_lockfile: string;
	export const DISPLAY: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const LANG: string;
	export const GNOME_TERMINAL_SERVICE: string;
	export const XDG_SESSION_DESKTOP: string;
	export const XAUTHORITY: string;
	export const npm_lifecycle_script: string;
	export const XDG_GREETER_DATA_DIR: string;
	export const SSH_AUTH_SOCK: string;
	export const SHELL: string;
	export const npm_package_version: string;
	export const npm_lifecycle_event: string;
	export const npm_config_verify_deps_before_run: string;
	export const NODE_PATH: string;
	export const QT_ACCESSIBILITY: string;
	export const GDMSESSION: string;
	export const npm_config_npm_globalconfig: string;
	export const GPG_AGENT_INFO: string;
	export const XDG_VTNR: string;
	export const npm_config_globalconfig: string;
	export const PWD: string;
	export const npm_execpath: string;
	export const XDG_DATA_DIRS: string;
	export const OMF_CONFIG: string;
	export const XDG_CONFIG_DIRS: string;
	export const npm_config__jsr_registry: string;
	export const npm_command: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const VTE_VERSION: string;
	export const INIT_CWD: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		LANGUAGE: string;
		USER: string;
		npm_config_user_agent: string;
		XDG_SEAT: string;
		XDG_SESSION_TYPE: string;
		npm_node_execpath: string;
		SHLVL: string;
		HOME: string;
		DESKTOP_SESSION: string;
		npm_package_json: string;
		COREPACK_ROOT: string;
		XDG_SEAT_PATH: string;
		GTK_MODULES: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		CINNAMON_VERSION: string;
		COLORTERM: string;
		GNOME_KEYRING_CONTROL: string;
		OMF_PATH: string;
		COREPACK_ENABLE_DOWNLOAD_PROMPT: string;
		LOGNAME: string;
		pnpm_config_verify_deps_before_run: string;
		XDG_SESSION_CLASS: string;
		npm_config_registry: string;
		XDG_SESSION_ID: string;
		TERM: string;
		GNOME_DESKTOP_SESSION_ID: string;
		npm_config_node_gyp: string;
		PATH: string;
		SESSION_MANAGER: string;
		GDM_LANG: string;
		GTK3_MODULES: string;
		npm_package_name: string;
		NODE: string;
		GNOME_TERMINAL_SCREEN: string;
		XDG_SESSION_PATH: string;
		XDG_RUNTIME_DIR: string;
		npm_config_frozen_lockfile: string;
		DISPLAY: string;
		XDG_CURRENT_DESKTOP: string;
		LANG: string;
		GNOME_TERMINAL_SERVICE: string;
		XDG_SESSION_DESKTOP: string;
		XAUTHORITY: string;
		npm_lifecycle_script: string;
		XDG_GREETER_DATA_DIR: string;
		SSH_AUTH_SOCK: string;
		SHELL: string;
		npm_package_version: string;
		npm_lifecycle_event: string;
		npm_config_verify_deps_before_run: string;
		NODE_PATH: string;
		QT_ACCESSIBILITY: string;
		GDMSESSION: string;
		npm_config_npm_globalconfig: string;
		GPG_AGENT_INFO: string;
		XDG_VTNR: string;
		npm_config_globalconfig: string;
		PWD: string;
		npm_execpath: string;
		XDG_DATA_DIRS: string;
		OMF_CONFIG: string;
		XDG_CONFIG_DIRS: string;
		npm_config__jsr_registry: string;
		npm_command: string;
		PNPM_SCRIPT_SRC_DIR: string;
		VTE_VERSION: string;
		INIT_CWD: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
