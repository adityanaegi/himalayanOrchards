import { useEffect, useRef, useState } from "react";
import banner from "./assets/banner.jpg";
import bottle1 from "./assets/bottle-1ltr.jpg";

// ---- Design options (switch with the pill at bottom-left; delete it once you pick one) ----
const THEMES = {
  "Kedar Blue": { "--bg": "#FFFFFF", "--ink": "#0E1C33", "--p": "#214289", "--s": "#8FA9DB", "--tint": "#EAF0FA", "--btn": "#214289", "--bi": "#FFFFFF", "--r": "999px" },
  Forest: { "--bg": "#FFFFFF", "--ink": "#16241C", "--p": "#0B4723", "--s": "#8FA7AE", "--tint": "#EEF4F6", "--btn": "#0B4723", "--bi": "#FFFFFF", "--r": "4px" },
  Mist: { "--bg": "#0B4723", "--ink": "#E6EEF0", "--p": "#FFFFFF", "--s": "#8FA7AE", "--tint": "#0F5A2D", "--btn": "#CFE0E4", "--bi": "#0B4723", "--r": "4px" },
};

// TODO: replace with real details
const WA = "91XXXXXXXXXX";
const PRODUCTS = [
  { n: "200 ml", use: "Events, hotels and travel", tall: false, info: "Ingredients and shelf life: add from the 200 ml label." },
  { n: "1 Ltr", use: "Homes, offices and shops", tall: true, img: bottle1, info: "Ingredients: 100% pure water. Best before 6 months of packing." },
];
const FEATURES = [
  ["Himalayan foothills", "Pure spring water from the pristine foothills of the Himalayas."],
  ["Naturally filtered", "For freshness and a crisp taste."],
  ["100% pure water", "Nothing added. Just water."],
  ["Packed in Kotdwar", "Manufactured by Himalayan Orchards."],
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&family=Noto+Sans+Devanagari:wght@500&display=swap');
.kj{font-family:Outfit,'Noto Sans Devanagari',Poppins,system-ui,sans-serif;background:var(--bg);color:var(--ink);min-height:100vh;line-height:1.6;overflow-x:hidden}
.kj *{box-sizing:border-box}
.kj h1,.kj h2,.kj h3{color:var(--p);line-height:1.15;margin:0 0 12px;font-weight:600}
.kj h1{font-size:clamp(2.2rem,6vw,3.8rem)}
.kj h2{font-size:clamp(1.5rem,3.5vw,2.2rem)}
.kj p{margin:0 0 14px;max-width:62ch}
.w{max-width:1040px;margin:0 auto;padding:0 20px}
.hd{position:sticky;top:0;background:var(--bg);border-bottom:1px solid var(--s);z-index:5}
.nav{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;padding:10px 0}
.nav nav{display:flex;flex-wrap:wrap}
.lk{background:none;border:0;border-bottom:2px solid transparent;color:var(--ink);font:inherit;padding:8px 10px;cursor:pointer;transition:border-color .25s,color .25s}
.lk:hover{border-color:var(--s)}
.lk.on{border-color:var(--s);color:var(--p)}
.b{background:var(--btn);color:var(--bi);border:2px solid var(--btn);border-radius:var(--r);padding:11px 22px;font:inherit;font-weight:500;cursor:pointer;text-decoration:none;display:inline-block;transition:transform .25s,background .25s,color .25s}
.b:hover{transform:translateY(-2px)}
.b.o{background:none;color:var(--p);border-color:var(--s)}
.sec{padding:56px 0}
.t{background:var(--tint)}
.row{display:flex;gap:32px;flex-wrap:wrap;align-items:center}
.row>*{flex:1 1 300px}
.fe{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:24px}
.fe div{border-left:2px solid var(--s);padding-left:16px}
.in{width:100%;padding:11px 12px;margin:4px 0 14px;font:inherit;color:var(--ink);background:var(--bg);border:1px solid var(--s);border-radius:8px}
.box{border:1px dashed var(--s);padding:16px;border-radius:8px}
.kj button:focus-visible,.kj input:focus-visible,.kj select:focus-visible,.kj textarea:focus-visible,.kj a:focus-visible{outline:3px solid var(--s);outline-offset:2px}
.sw{position:fixed;left:12px;bottom:12px;display:flex;gap:4px;background:var(--bg);border:1px solid var(--s);padding:4px;border-radius:999px;z-index:9;font-size:13px}
.sw button{border:0;border-radius:999px;padding:5px 12px;font:inherit;cursor:pointer;background:none;color:var(--ink)}
.sw button.on{background:var(--s);color:#0B1A12}

.em{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;width:50px;height:50px;border-radius:50%;background:#214289;color:#fff;border:2px solid #fff;box-shadow:0 0 0 1px var(--s);line-height:1}
.em b{font-size:10px;letter-spacing:.5px;font-weight:600}
.em i{font-style:normal;font-size:15px;font-weight:500;margin-top:1px}
.ph{overflow:hidden;border-radius:16px;aspect-ratio:4/5;max-width:440px;margin:0 auto;width:100%}
.ph img{display:block;width:100%;height:100%;object-fit:cover;object-position:50% 40%;transform:scale(1.14);transition:transform 1.6s cubic-bezier(.2,.7,.2,1)}
.ph.vis img{transform:scale(1)}
.md{width:100%;height:340px;border-radius:10px;overflow:hidden;margin-bottom:16px;display:flex;align-items:center;justify-content:center;background:var(--bg)}
.md img{width:100%;height:100%;object-fit:cover;object-position:50% 22%}
.md .fl{transform-origin:center}
.md svg{transform:scale(1.7)}

/* ---- About: scroll-driven journey ---- */
.jr{position:relative;padding:4px 0 0 76px;margin-top:24px;--y:0px;--f:0}
.jpk{position:absolute;left:0;top:0}
.jk{position:absolute;left:22px;top:44px;bottom:140px;width:3px}
.jk::before{content:"";position:absolute;inset:0;background:var(--s);opacity:.35;border-radius:3px}
.jf{position:absolute;left:0;top:0;width:100%;background:var(--p);border-radius:3px;height:clamp(0px,calc(var(--y) - 44px),100%)}
.jd{position:absolute;left:50%;width:15px;height:15px;margin:-7px 0 0 -7px;background:var(--p);border-radius:50% 50% 50% 0;transform:rotate(-45deg);top:clamp(0px,calc(var(--y) - 44px),100%)}
.js{position:relative;padding-bottom:72px}
.js:last-of-type{padding-bottom:40px}
.jn{position:absolute;left:-76px;top:0;width:36px;height:36px;margin-left:6px;border:2px solid var(--s);border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--bg);color:var(--ink);font-weight:600;font-size:15px;transition:background .4s,color .4s,border-color .4s,transform .4s}
.js.on .jn{background:var(--p);color:var(--bg);border-color:var(--p);transform:scale(1.1)}
.jt{opacity:.3;transform:translateX(14px);transition:opacity .6s,transform .6s cubic-bezier(.2,.7,.2,1)}
.js.on .jt{opacity:1;transform:none}
.jt h3{margin-top:4px}
.jb{display:block;position:relative;left:-76px;margin-top:16px}
.wf{transform:scaleY(var(--f,0));transform-origin:50% 100%;transform-box:fill-box;transition:transform .15s linear}

/* ---- Hero: banner photo ---- */
.hero{position:relative;overflow:hidden;color:#fff;min-height:max(540px,calc(100vh - 64px));padding-top:clamp(70px,20vh,200px);background:#141c28}
.hero-par{position:absolute;inset:0;z-index:0;will-change:transform}
.hero-bg{position:absolute;inset:-4%;background-size:cover;background-position:center 70%;animation:kb 30s ease-in-out infinite alternate}
.hero::before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(6,14,24,.35),rgba(6,14,24,.05) 55%,rgba(6,14,24,.3))}
.hero::after{content:"";position:absolute;left:0;right:0;bottom:0;height:20%;z-index:1;background:linear-gradient(transparent,var(--tint))}
.mist{position:absolute;left:0;bottom:14%;width:200%;height:38%;z-index:1;filter:blur(18px);animation:drift 55s linear infinite alternate;
  background:radial-gradient(ellipse 14% 45% at 15% 60%,rgba(255,255,255,.16),transparent),radial-gradient(ellipse 12% 38% at 48% 50%,rgba(255,255,255,.12),transparent),radial-gradient(ellipse 15% 45% at 80% 62%,rgba(255,255,255,.15),transparent)}
.hero-in{position:relative;z-index:2;text-align:right}
.hero h1{color:#fff;font-size:clamp(3rem,10vw,6.2rem);letter-spacing:1px;margin-bottom:8px}
.hero h1 b{font-weight:600}
.hero h1 span{font-weight:500}
.hero p{color:#E9F0F3;font-size:clamp(1.05rem,2.4vw,1.4rem);margin:0 0 22px auto}
.hero .b{background:transparent;color:#fff;border-color:#fff}
.hero .b:hover{background:#fff;color:#0B1A12}
.hero .b+.b{margin-left:10px}
@media(max-width:700px){.hero-in{text-align:center}.hero p{margin:0 auto 22px}}

/* ---- Motion ---- */
.hx{opacity:0;animation:up .9s cubic-bezier(.2,.7,.2,1) forwards}
.rv{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.7,.2,1)}
.rv.vis{opacity:1;transform:none}
.fl{animation:fl 5s ease-in-out infinite}
@keyframes up{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
@keyframes kb{from{transform:scale(1.02)}to{transform:scale(1.12) translate3d(-1.5%,0,0)}}
@keyframes drift{to{transform:translateX(-45%)}}
@keyframes fl{50%{transform:translateY(-12px)}}
@media(prefers-reduced-motion:reduce){
  .kj *,.kj *::before,.kj *::after{animation:none!important;transition:none!important}
  .hx,.rv{opacity:1!important;transform:none!important}
}
`;

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <span className="em"><b>KEDAR</b><i>जल</i></span>
    <span style={{ fontSize: 12, color: "var(--ink)", opacity: 0.7 }}>by Himalayan Orchards</span>
  </div>
);

const Bottle = ({ tall, label }) => {
  const h = tall ? 190 : 110, w = tall ? 64 : 46, W = w + 20;
  return (
    <svg width={W} height={h + 30} viewBox={`0 0 ${W} ${h + 30}`} role="img" aria-label={`${label} bottle`}>
      <rect x={W / 2 - 9} y="0" width="18" height="12" rx="3" fill="#214289" />
      <rect x="10" y="12" width={w} height={h + 16} rx="14" fill="var(--tint)" stroke="var(--s)" strokeWidth="2" />
      <rect x="10" y={h * 0.4} width={w} height={h * 0.4} fill="#214289" />
      <text x={W / 2} y={h * 0.4 + h * 0.24} textAnchor="middle" fill="#fff" fontSize="9">{label}</text>
    </svg>
  );
};

// Fades and lifts its content in the first time it scrolls into view
function Reveal({ children, delay = 0, className = "", style, ...rest }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`rv${on ? " vis" : ""} ${className}`} style={{ ...style, transitionDelay: `${delay}ms` }} {...rest}>{children}</div>;
}

// Line and drop follow the scroll; each step lights up as the drop reaches it; the bottle fills at the end
function Journey({ steps }) {
  const box = useRef(null);
  useEffect(() => {
    const el = box.current; if (!el) return;
    const items = [...el.querySelectorAll(".js")];
    const bottle = el.querySelector(".jb");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const paint = () => {
      raf = 0;
      const h = el.offsetHeight;
      const box0 = el.getBoundingClientRect();
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      const y = calm || atEnd ? h : Math.min(h, Math.max(0, window.innerHeight * 0.6 - box0.top));
      el.style.setProperty("--y", y + "px");
      items.forEach((it) => it.classList.toggle("on", y >= it.offsetTop + 18));
      const bt = bottle.getBoundingClientRect().top - box0.top;
      el.style.setProperty("--f", Math.min(1, Math.max(0, (y - bt) / (h - bt - 30))).toFixed(3));
    };
    const tick = () => { if (!raf) raf = requestAnimationFrame(paint); };
    paint();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => { window.removeEventListener("scroll", tick); window.removeEventListener("resize", tick); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="jr" ref={box}>
      <svg className="jpk" width="48" height="36" viewBox="0 0 48 36" aria-hidden="true">
        <path d="M1 35 15 12l7 10 9-18 16 31z" fill="var(--s)" />
        <path d="M31 4l5 9-5-3-4 3z" fill="#fff" />
      </svg>
      <div className="jk"><div className="jf" /><i className="jd" /></div>
      {steps.map(([a, b], i) => (
        <div className="js" key={a}><span className="jn">{i + 1}</span><div className="jt"><h3>{a}</h3><p>{b}</p></div></div>
      ))}
      <svg className="jb" width="48" height="120" viewBox="0 0 80 200" role="img" aria-label="Kedar Jal bottle filling with water">
        <defs><clipPath id="jrb"><path d="M32 14H48V30C48 44 68 46 68 70V180Q68 192 56 192H24Q12 192 12 180V70C12 46 32 44 32 30Z" /></clipPath></defs>
        <rect x="31" y="0" width="18" height="14" rx="3" fill="#214289" />
        <g clipPath="url(#jrb)"><rect x="0" y="14" width="80" height="180" fill="var(--tint)" /><rect className="wf" x="0" y="40" width="80" height="154" fill="#214289" /></g>
        <path d="M32 14H48V30C48 44 68 46 68 70V180Q68 192 56 192H24Q12 192 12 180V70C12 46 32 44 32 30Z" fill="none" stroke="var(--s)" strokeWidth="3" />
      </svg>
    </div>
  );
}

function Hero({ go }) {
  const par = useRef(null);
  useEffect(() => { // background moves slower than the page
    const onScroll = () => { if (par.current) par.current.style.transform = `translate3d(0,${Math.min(window.scrollY, 700) * 0.25}px,0)`; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <section className="hero">
      <div className="hero-par" ref={par}><div className="hero-bg" style={{ backgroundImage: `url(${banner})` }} /></div>
      <div className="mist" aria-hidden="true" />
      <div className="w hero-in">
        <h1 className="hx" style={{ animationDelay: ".2s" }}><b>Kedar</b> <span>जल</span></h1>
        <p className="hx" style={{ animationDelay: ".5s" }}>Experience nature's purity in every sip.</p>
        <div className="hx" style={{ animationDelay: ".8s" }}>
          <button className="b" onClick={() => go("products")}>Our products</button>
          <button className="b" onClick={() => go("contact")}>Contact us</button>
        </div>
      </div>
    </section>
  );
}

function Home({ go }) {
  return (
    <>
      <Hero go={go} />
      <section className="sec t" style={{ paddingTop: 24 }}>
        <div className="w fe">
          {FEATURES.map(([a, b], i) => <Reveal key={a} delay={i * 120}><h3>{a}</h3><p>{b}</p></Reveal>)}
        </div>
      </section>
      <section className="sec">
        <div className="w row">
          <Reveal>
            <h2>Two sizes, one source</h2>
            <p>200 ml for events, hotels and travel. 1 Ltr for homes, offices and shops.</p>
            <button className="b o" onClick={() => go("products")}>View both sizes</button>
          </Reveal>
          <Reveal delay={150} className="ph"><img src={bottle1} alt="Kedar Jal 1 Ltr bottle held up against the sky" loading="lazy" /></Reveal>
        </div>
      </section>
      <section className="sec t">
        <div className="w">
          <Reveal>
            <h2>Want to stock or distribute Kedar Jal?</h2>
            <p>Tell us your city and the quantity you need.</p>
            <button className="b" onClick={() => go("contact")}>Send an inquiry</button>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function About() {
  const steps = [["Source", "Pure spring water from the pristine foothills of the Himalayas."], ["Filtration", "Naturally filtered for freshness and a crisp taste."], ["Testing", "Checked before it is bottled."], ["Bottling", "Filled and sealed at our Kotdwar plant."], ["Delivery", "Sent to shops, hotels and homes."]];
  return (
    <>
      <section className="sec">
        <div className="w">
          <Reveal>
            <h1>Rooted in the mountains</h1>
            <p>Himalayan Orchards began in Kotdwar, the gateway to Garhwal. Kedar Jal brings the water of these hills to your table. Replace this paragraph with your own story: who started it, why, and what you stand for.</p>
          </Reveal>
        </div>
      </section>
      <section className="sec t">
        <div className="w">
          <h2>From source to bottle</h2>
          <Journey steps={steps} />
        </div>
      </section>
      <section className="sec">
        <div className="w">
          <Reveal>
            <h2>Licences and lab reports</h2>
            <div className="box"><p style={{ margin: 0 }}>Add your FSSAI and BIS licence numbers and a link to the latest water-quality report here.</p></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Products({ go, pick }) {
  return (
    <section className="sec">
      <div className="w">
        <h1>Our bottles</h1>
        <p>Pure spring water from the foothills of the Himalayas, in two sizes.</p>
        <div className="row" style={{ alignItems: "stretch", marginTop: 24 }}>
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.n} delay={i * 150} className="t" style={{ padding: 24, borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div className="md">{p.img ? <img src={p.img} alt={`Kedar Jal ${p.n} bottle`} loading="lazy" /> : <div className="fl"><Bottle tall={p.tall} label={p.n} /></div>}</div>
              <h2>{p.n}</h2>
              <p>{p.use}.</p>
              <p style={{ fontSize: 14 }}>{p.info}</p>
              <button className="b" onClick={() => { pick(p.n); go("contact"); }}>Ask for a quote</button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ f, set }) {
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const submit = () => {
    if (!f.name.trim() || !f.phone.trim()) return setErr("Enter your name and phone number.");
    setErr(""); setSent(true); // TODO: send f to your backend / email service
  };
  const field = (k, label, props = {}) => (
    <label>{label}<input className="in" value={f[k]} onChange={(e) => set(k, e.target.value)} {...props} /></label>
  );
  return (
    <section className="sec">
      <div className="w row" style={{ alignItems: "flex-start" }}>
        <div>
          <h1>Get in touch</h1>
          {sent ? (
            <div className="box" role="status"><h3>Thank you, {f.name}</h3><p style={{ margin: 0 }}>We have your inquiry and will contact you on {f.phone}.</p></div>
          ) : (
            <div>
              {field("name", "Name")}
              {field("phone", "Phone number", { type: "tel" })}
              {field("city", "City")}
              <label>I am a<select className="in" value={f.type} onChange={(e) => set("type", e.target.value)}>
                {["Distributor", "Retailer", "Bulk or event buyer", "Other"].map((o) => <option key={o}>{o}</option>)}</select></label>
              <label>Bottle size<select className="in" value={f.product} onChange={(e) => set("product", e.target.value)}>
                {["200 ml", "1 Ltr", "Both sizes"].map((o) => <option key={o}>{o}</option>)}</select></label>
              <label>Message<textarea className="in" rows={3} value={f.msg} onChange={(e) => set("msg", e.target.value)} /></label>
              {err && <p role="alert" style={{ color: "var(--p)", fontWeight: 600 }}>{err}</p>}
              <button className="b" onClick={submit}>Send inquiry</button>
            </div>
          )}
        </div>
        <Reveal delay={150}>
          <h2>Talk to us now</h2>
          <p><a className="b o" href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer">Chat on WhatsApp</a></p>
          <p>Himalayan Orchards<br />Kotdwar, Uttarakhand<br />Phone: add number<br />Email: add address</p>
          <div className="box">Embed a Google Map of your plant here.</div>
        </Reveal>
      </div>
    </section>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [theme, setTheme] = useState("Kedar Blue");
  const [f, setF] = useState({ name: "", phone: "", city: "", type: "Retailer", product: "Both sizes", msg: "" });
  const set = (k, v) => setF((o) => ({ ...o, [k]: v }));
  const go = (p) => { setPage(p); window.scrollTo(0, 0); };
  const nav = [["home", "Home"], ["about", "About"], ["products", "Products"], ["contact", "Contact"]];

  return (
    <div className="kj" style={THEMES[theme]}>
      <style>{CSS}</style>
      <header className="hd">
        <div className="w nav">
          <button className="lk" onClick={() => go("home")} aria-label="Kedar Jal home"><Logo /></button>
          <nav>{nav.map(([k, l]) => <button key={k} className={"lk" + (page === k ? " on" : "")} onClick={() => go(k)}>{l}</button>)}</nav>
        </div>
      </header>
      {page === "home" && <Home go={go} />}
      {page === "about" && <About />}
      {page === "products" && <Products go={go} pick={(n) => set("product", n)} />}
      {page === "contact" && <Contact f={f} set={set} />}
      <footer className="t" style={{ padding: "28px 0" }}>
        <div className="w"><b style={{ color: "var(--p)" }}>Kedar Jal</b> by Himalayan Orchards<br />Kotdwar, Uttarakhand. FSSAI and BIS numbers: add here.</div>
      </footer>
      <div className="sw" aria-label="Design option">
        {Object.keys(THEMES).map((k) => <button key={k} className={theme === k ? "on" : ""} onClick={() => setTheme(k)}>{k}</button>)}
      </div>
    </div>
  );
}
