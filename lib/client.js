/**
 * Browser half: hide the sidebar brand row ("deepseek HARNESS" + whale mark).
 *
 * Why CSS instead of clearing the `sidebar.brand.*` slots: the sidebar renders
 * those slots with a built-in fallback (whale mark + local-build label), so an
 * empty occupant would still leave the row in place. Hiding the row removes the
 * element and its 60px height, letting the "new session" button move up.
 *
 * Selector notes:
 * - The row's class is hashed per build (`kB3qhq_logoRow`), so match on the
 *   stable suffix with an attribute selector; a version bump will not break it.
 * - Only `logoRow` is hidden. On macOS this row is display-only (no click
 *   target), so nothing interactive is lost.
 *
 * Contract: the `factory` MUST return a module object carrying `apply`. The
 * browser-side loader hands that return value to `ctx.plugin()`, and returning
 * undefined makes cordis reject the whole boot with
 * `invalid plugin, expect function or object with an "apply" method`.
 * That was the 2026-11-05 start failure. Both working precedents end with
 * `return module.exports`: dsh-client-ui-brand-official and dsh-custom-logo.
 */

const PLUGIN = "dsh-hide-brand";
const CSS_KEY = `${PLUGIN}/logo-row`;
const CSS = '[class*="logoRow"]{display:none!important}';

/** Inject the rule once; degrade silently when the DOM is not ready yet. */
function injectStyle() {
  if (typeof document === "undefined") return;

  const root = document.head ?? document.documentElement;
  if (!root) return;

  if (document.querySelector(`style[data-plugin-css="${CSS_KEY}"]`) !== null) return;

  const style = document.createElement("style");
  style.dataset.plugin = PLUGIN;
  style.dataset.pluginCss = CSS_KEY;
  style.textContent = CSS;
  root.appendChild(style);
}

/** No client services are required. */
const inject = [];

/** A cosmetic client plugin: apply the rule and register nothing. */
function apply() {
  injectStyle();
}

const loader = globalThis.window?.__ModuleLoader__;
if (loader?.load) {
  loader.load({
    id: PLUGIN,
    factory: () => {
      const module = { exports: {} };
      const exports = module.exports;

      exports.name = PLUGIN;
      exports.inject = inject;
      exports.apply = apply;

      return module.exports;
    },
  });
}
