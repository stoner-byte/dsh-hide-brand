/**
 * Host entry for the browser-only hide-brand plugin.
 *
 * All behaviour lives in `lib/client.js`; the host side exists only because the
 * loader needs a package entry to mount. It registers nothing and touches no
 * service, so it cannot fail a profile start.
 *
 * Shape: a single default export object, matching every other DSH plugin in the
 * wild (dsh-whale-widget, dsh-custom-logo). Named exports alone are unwrapped
 * differently by the loader and were the suspected cause of a start failure on
 * 2026-11-05; the object form is the shape the loader documents.
 */

export default {
  name: "dsh-hide-brand",
  inject: [],
  apply() {},
};
