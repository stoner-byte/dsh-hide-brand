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
 */

const PLUGIN = "dsh-hide-brand";
const CSS_KEY = `${PLUGIN}/logo-row`;
const CSS = '[class*="logoRow"]{display:none!important}';

function injectStyle() {
  if (document.querySelector(`style[data-plugin-css="${CSS_KEY}"]`) !== null) return;

  const style = document.createElement("style");
  style.dataset.plugin = PLUGIN;
  style.dataset.pluginCss = CSS_KEY;
  style.textContent = CSS;

  // `head` is normally present when client modules load; fall back so an early
  // mount still applies the rule instead of throwing.
  (document.head ?? document.documentElement).appendChild(style);
}

window.__ModuleLoader__.load({
  id: PLUGIN,
  factory: () => {
    injectStyle();
  },
});
