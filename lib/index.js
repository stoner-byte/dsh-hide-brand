/**
 * Host entry for the browser-only hide-brand plugin.
 *
 * All behaviour lives in `lib/client.js`; the host side exists only because the
 * loader needs a package entry to mount. It registers nothing and touches no
 * service, so it cannot fail a profile start.
 */

/** Loader-facing plugin name. */
export const name = "dsh-hide-brand";

/** No host services are required. */
export const inject = [];

/** Intentionally empty. */
export function apply() {}
