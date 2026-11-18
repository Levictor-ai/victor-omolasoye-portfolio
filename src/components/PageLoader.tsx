/**
 * First-paint brand loader.
 *
 * Rendered in the server HTML so it covers the initial paint instantly, then
 * dissolves as soon as the document is ready (fonts raced with a short cap, so
 * it never waits on slow images). It is intentionally CSS-only for the visuals
 * and runs a tiny inline script for dismissal, so it does not depend on React
 * hydration to get out of the way.
 */
export function PageLoader() {
  return (
    <>
      <noscript>
        <style>{`#page-loader{display:none!important}`}</style>
      </noscript>

      <div
        id="page-loader"
        className="page-loader"
        role="status"
        aria-live="polite"
        aria-label="Loading Victor Omolasoye's portfolio"
      >
        <div className="page-loader-glow" aria-hidden="true" />

        <div className="page-loader-inner">
          <div className="pl-stage" aria-hidden="true">
            <span className="pl-halo" />
            <span className="pl-crop pl-crop-tl" />
            <span className="pl-crop pl-crop-tr" />
            <span className="pl-crop pl-crop-bl" />
            <span className="pl-crop pl-crop-br" />

            <svg className="pl-orbit" viewBox="0 0 132 132" fill="none">
              <circle className="pl-orbit-track" cx="66" cy="66" r="64" />
              <circle className="pl-orbit-arc" cx="66" cy="66" r="64" />
            </svg>

            <div className="pl-card">
              <span className="pl-sheen" />
              <svg className="pl-glyph" viewBox="0 0 120 120" fill="none">
                <defs>
                  <linearGradient id="pl-glyph-gradient" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#2F5BFF" />
                    <stop offset="0.55" stopColor="#6C5BFF" />
                    <stop offset="1" stopColor="#AF52DE" />
                  </linearGradient>
                </defs>
                <path
                  className="pl-glyph-path"
                  d="M28 30L60 92L92 30"
                  stroke="url(#pl-glyph-gradient)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle className="pl-glyph-dot" cx="60" cy="92" r="4.5" fill="#2F5BFF" />
              </svg>
            </div>
          </div>

          <div className="pl-copy">
            <p className="pl-name">Victor Omolasoye</p>
            <p className="pl-role">Brand &amp; Product Designer</p>
          </div>

          <div className="pl-track" aria-hidden="true">
            <span className="pl-fill" />
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{
  var el=document.getElementById('page-loader');
  if(!el)return;
  var start=Date.now(), MIN=240, MAX=1800, finished=false;
  document.documentElement.classList.add('is-loading');
  function finish(){
    if(finished)return; finished=true;
    el.style.pointerEvents='none';
    el.setAttribute('data-state','done');
    document.documentElement.classList.remove('is-loading');
    document.documentElement.classList.add('is-ready');
    window.setTimeout(function(){ if(el.parentNode) el.parentNode.removeChild(el); }, 600);
  }
  function ready(){
    var wait=Math.max(0, MIN-(Date.now()-start));
    var fonts=(document.fonts&&document.fonts.ready)?document.fonts.ready:null;
    var cap=new Promise(function(resolve){ window.setTimeout(resolve,280); });
    Promise.race([fonts||cap,cap]).then(function(){ window.setTimeout(finish, wait); });
  }
  if(document.readyState==='complete'||document.readyState==='interactive'){
    ready();
  }else{
    document.addEventListener('DOMContentLoaded', ready, {once:true});
  }
  window.setTimeout(finish, MAX);
}catch(e){}})();`,
        }}
      />
    </>
  );
}
