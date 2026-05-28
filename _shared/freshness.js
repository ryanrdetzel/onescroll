// onescroll.dev — freshness banner
// Reads #onescroll-meta JSON, shows a banner if the page is past its
// volatility-dependent staleness threshold.
(function () {
  const node = document.getElementById('onescroll-meta');
  if (!node) return;

  let meta;
  try { meta = JSON.parse(node.textContent); } catch (e) { return; }
  if (!meta.generated) return;

  const generated = new Date(meta.generated);
  if (isNaN(generated)) return;

  const ageDays = Math.floor((Date.now() - generated.getTime()) / 86400000);

  // Staleness thresholds (days). Tune as the site grows.
  const thresholds = {
    evergreen: 365 * 3, // 3 years
    slow:      365,     // 1 year
    fast:      180      // 6 months
  };
  const limit = thresholds[meta.volatility] ?? 365;
  if (ageDays <= limit) return;

  const fmtAge = (d) => {
    if (d < 60)  return `${d} days`;
    if (d < 730) return `${Math.floor(d / 30)} months`;
    return `${Math.floor(d / 365)} years`;
  };

  const banner = document.createElement('div');
  banner.className = 'onescroll-stale-banner';
  banner.setAttribute('role', 'status');
  banner.innerHTML =
    `<span aria-hidden="true">⚠</span> Generated ${fmtAge(ageDays)} ago — ` +
    `this page may be out of date. ` +
    `<a href="/">onescroll.dev</a>`;
  document.body.insertBefore(banner, document.body.firstChild);
})();
