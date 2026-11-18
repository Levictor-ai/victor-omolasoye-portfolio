const NAME = 'Victor';
const SURNAME = 'Omolasoye';

const ACCENT_FROM = [47, 91, 255];
const ACCENT_TO = [168, 85, 247];

function accentColor(index: number, total: number) {
  const t = total <= 1 ? 0 : index / (total - 1);
  const mix = (from: number, to: number) => Math.round(from + (to - from) * t);
  return `rgb(${mix(ACCENT_FROM[0], ACCENT_TO[0])}, ${mix(ACCENT_FROM[1], ACCENT_TO[1])}, ${mix(ACCENT_FROM[2], ACCENT_TO[2])})`;
}

/**
 * First-paint brand loader.
 *
 * Rendered in the server HTML so it covers the initial paint instantly, then
 * holds for a 2s brand beat and dissolves. It is intentionally CSS-only for
 * the visuals and runs a tiny inline script for dismissal, so it does not
 * depend on React hydration to get out of the way.
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
          <p className="pl-kicker" aria-hidden="true">Portfolio — 2026</p>

          <div className="pl-wordmark" aria-hidden="true">
            <span className="pl-line">
              {NAME.split('').map((letter, i) => (
                <span
                  key={`v-${i}`}
                  className="pl-letter"
                  style={{ animationDelay: `${0.04 + i * 0.03}s` }}
                >
                  {letter}
                </span>
              ))}
            </span>
            <span className="pl-line pl-line-accent">
              {SURNAME.split('').map((letter, i) => (
                <span
                  key={`o-${i}`}
                  className="pl-letter"
                  style={{
                    animationDelay: `${0.14 + i * 0.03}s`,
                    color: accentColor(i, SURNAME.length),
                  }}
                >
                  {letter}
                </span>
              ))}
              <span className="pl-caret" />
            </span>
          </div>

          <span className="pl-rule" aria-hidden="true" />

          <p className="pl-role">Brand &amp; Product Designer</p>

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
  var start=Date.now(), MIN=2000, MAX=3200, finished=false;
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
