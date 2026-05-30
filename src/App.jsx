// ============================================================
// Webdro Portfolio — App.jsx
// Dependencies: react-icons  →  npm install react-icons
// Logo: place your logo at  src/assets/images/logo.png
// ============================================================

import { useState, useEffect, useRef } from "react";

// ── react-icons ──────────────────────────────────────────────
import { FaInstagram, FaWhatsapp, FaBars, FaTimes, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { FiMonitor, FiBriefcase, FiLayout, FiPenTool, FiSmartphone, FiZap, FiArrowRight, FiExternalLink, FiCode, FiGlobe, FiLayers, FiCheckCircle } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { MdRocketLaunch } from "react-icons/md";
import { SiNetlify } from "react-icons/si";

// ── Logo — swap this path to your actual logo file ──────────
import webdroLogo from "./assets/images/logo.png";
import sm from "./assets/images/sm.png";
import dp from "./assets/images/dp.png";;
// ── Data ─────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "About", "Services", "Projects", "Contact"];

const SERVICES = [
  { Icon: FiMonitor,   title: "Portfolio Websites",   desc: "Stunning personal and professional portfolios that make lasting first impressions." },
  { Icon: FiBriefcase, title: "Business Websites",    desc: "Corporate-grade websites that build trust and drive real business results." },
  { Icon: MdRocketLaunch, title: "Landing Pages",     desc: "High-converting landing pages designed to capture leads and grow your brand." },
  { Icon: FiPenTool,   title: "UI/UX Design",         desc: "Pixel-perfect interfaces crafted with modern design principles and user focus." },
  { Icon: FiSmartphone,title: "Responsive Design",    desc: "Flawless experience across all devices — mobile, tablet, and desktop." },
  { Icon: FiZap,       title: "Startup Websites",     desc: "Launch-ready websites for startups that tell your story and attract investors." },
];

// Unsplash images chosen to match each project theme
const PROJECTS = [
  {
    title: "Aura Fitness",
    url: "https://fitnessaura.netlify.app/",
    desc: "Modern gym website with bold responsive UI and energetic design.",
    tag: "Fitness",
    color: "#f97316",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  },
  {
    title: "Shutter Point Photography",
    url: "https://shutterpoint.netlify.app/",
    desc: "Cinematic photography portfolio with elegant modern gallery design.",
    tag: "Photography",
    color: "#a855f7",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
  },
  {
    title: "Shahi Mahal",
    url: "https://shahiiinn.netlify.app/",
    desc: "Luxury dark-themed restaurant website with premium menu showcase.",
    tag: "Restaurant",
    color: "#ec4899",
    image: sm,
  },
  {
    title: "Deepesh portfolio",
    url: "https://deepesh19portfolio.netlify.app/",
    desc: "Modern personal portfolio website for students and creators.",
    tag: "Portfolio",
    color: "#06b6d4",
    image: dp,
  },
  {
    title: "Maison Elara Boutique",
    url: "https://maisonelaraboutique.netlify.app/",
    desc: "Luxury fashion boutique with elegant e-commerce inspired UI.",
    tag: "Fashion",
    color: "#eab308",
    image: "https://imgmediagumlet.lbb.in/media/2025/04/68061caf974f9124ce627d6d_1745231023760.jpg",
  },
  {
    title: "Cafe Nila",
    url: "https://cafenila.netlify.app/",
    desc: "Elegant modern café website with cozy aesthetic and premium layout.",
    tag: "Cafe",
    color: "#84cc16",
    image: "https://i.pinimg.com/474x/55/0c/5d/550c5d2f747fc6c4e727bdd98739c19b.jpg?nii=t",
  },
];

const FAQS = [
  { q: "How much does a website cost?",           a: "Pricing depends on complexity. Portfolio sites start from ₹2,999, business websites from ₹5,999, and custom projects are quoted individually. Contact us for a free quote." },
  { q: "How long does delivery take?",             a: "Simple portfolio or landing pages: 3–5 days. Business websites: 7–14 days. Complex custom projects may take 2–4 weeks depending on requirements." },
  { q: "Will my website be mobile responsive?",    a: "Absolutely. Every website we build is fully responsive and tested across all screen sizes — mobile, tablet, and desktop." },
  { q: "How many revisions are included?",         a: "We offer 2 rounds of free revisions on all projects. Additional revisions are available at a nominal fee." },
  { q: "Can I get a fully custom website?",        a: "Yes! We specialize in custom websites tailored exactly to your vision, brand, and goals. Nothing cookie-cutter." },
  { q: "Do you build portfolio websites for students?", a: "Absolutely. We love helping students launch their online presence. We offer student-friendly pricing and fast delivery." },
];

// ── Helpers ───────────────────────────────────────────────────
function GlowOrb({ x, y, color = "#3b82f6", size = 300, opacity = 0.15 }) {
  const hex = Math.round(opacity * 255).toString(16).padStart(2, "0");
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: size, height: size,
      background: `radial-gradient(circle, ${color}${hex} 0%, transparent 70%)`,
      borderRadius: "50%", pointerEvents: "none", filter: "blur(40px)", zIndex: 0,
    }} />
  );
}

// ── Global styles injected once ───────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  body { background:#060814; color:#fff; font-family:'DM Sans',sans-serif; overflow-x:hidden; }
  h1,h2,h3,h4 { font-family:'Syne',sans-serif; }
  input, textarea, button { font-family:'DM Sans',sans-serif; }

  @keyframes float      { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-18px)} }
  @keyframes floatB     { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-10px)} }
  @keyframes pulseGlow  { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
  @keyframes shimmer    { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes fadeUp     { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes spin       { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes borderGlow { 0%,100%{box-shadow:0 0 12px rgba(99,102,241,.4)} 50%{box-shadow:0 0 32px rgba(167,139,250,.7)} }
  @keyframes imgZoom    { from{transform:scale(1)} to{transform:scale(1.07)} }

  .section-title {
    font-size: clamp(1.9rem,5vw,3.2rem);
    font-weight:800;
    background: linear-gradient(90deg,#fff 0%,#a78bfa 50%,#60a5fa 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-size:200% auto;
    animation: shimmer 5s linear infinite;
  }
  .glass {
    background: rgba(255,255,255,.03);
    border: 1px solid rgba(255,255,255,.08);
    backdrop-filter: blur(20px);
    border-radius:20px;
    transition: all .35s ease;
  }
  .glass:hover {
    background:rgba(255,255,255,.055);
    border-color:rgba(99,102,241,.35);
    transform:translateY(-6px);
    box-shadow:0 24px 60px rgba(99,102,241,.14);
  }
  .grid-bg {
    background-image:
      linear-gradient(rgba(99,102,241,.045) 1px, transparent 1px),
      linear-gradient(90deg,rgba(99,102,241,.045) 1px, transparent 1px);
    background-size:60px 60px;
  }
  .btn-primary {
    background:linear-gradient(135deg,#3b82f6,#8b5cf6);
    border:none; color:#fff; border-radius:12px;
    font-weight:700; cursor:pointer;
    box-shadow:0 0 32px rgba(99,102,241,.45);
    transition:all .3s;
  }
  .btn-primary:hover { transform:translateY(-2px) scale(1.04); box-shadow:0 0 50px rgba(99,102,241,.75); }
  .btn-ghost {
    background:transparent;
    border:1px solid rgba(255,255,255,.18); color:#fff; border-radius:12px;
    font-weight:600; cursor:pointer;
    transition:all .3s;
  }
  .btn-ghost:hover { border-color:rgba(99,102,241,.6); background:rgba(99,102,241,.1); }

  /* react-icon hover lift */
  .icon-lift { transition:transform .25s, color .25s; }
  .icon-lift:hover { transform:translateY(-3px) scale(1.18); }

  /* project card image zoom */
  .proj-img { transition:transform .55s cubic-bezier(.25,.46,.45,.94); }
  .proj-card:hover .proj-img { transform:scale(1.07); }

  @media(max-width:768px) {
    .desktop-nav { display:none!important; }
    .hamburger   { display:flex!important; }
    .two-col     { grid-template-columns:1fr!important; }
    .contact-grid{ grid-template-columns:1fr!important; }
  }
`;

// ── Navbar ────────────────────────────────────────────────────
function Navbar({ active, setActive }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [imgError, setImgError]   = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActive(id);
  };

  const Logo = () => (
    <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={() => scrollTo("home")}>
      {!imgError ? (
        <img
          src={webdroLogo}
          alt="Webdro"
          onError={() => setImgError(true)}
          style={{ height:42, width:"auto", objectFit:"contain", filter:"drop-shadow(0 0 10px rgba(139,92,246,.5))" }}
        />
      ) : (
        /* Fallback SVG logo if image fails */
        <div style={{
          height:42, width:42, borderRadius:"50%",
          background:"linear-gradient(135deg,#3b82f6,#8b5cf6,#ec4899)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:18, fontWeight:900, color:"#fff",
          boxShadow:"0 0 10px rgba(124, 77, 255, 0.4)",
        }}>
          <FiCode size={20} color="#fff" />
        </div>
      )}
      {imgError && (
        <span style={{
          fontSize:22, fontWeight:800, letterSpacing:"-0.5px",
          background:"linear-gradient(90deg,#60a5fa,#a78bfa,#f472b6)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
        }}>webdro</span>
      )}
    </div>
  );

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:200,
      background: scrolled ? "rgba(6,8,20,.92)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(99,102,241,.15)" : "none",
      transition:"all .4s ease",
      padding:"0 clamp(1rem,4vw,3rem)",
    }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:70 }}>
        <Logo />

        {/* Desktop */}
        <div className="desktop-nav" style={{ display:"flex", alignItems:"center", gap:4 }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link)} style={{
              background:"none", border:"none", cursor:"pointer",
              color: active === link ? "#60a5fa" : "rgba(255,255,255,.7)",
              fontSize:14, fontWeight:500, padding:"7px 15px", borderRadius:8,
              transition:"color .2s",
            }}
              onMouseEnter={e => e.target.style.color="#fff"}
              onMouseLeave={e => e.target.style.color = active===link ? "#60a5fa" : "rgba(255,255,255,.7)"}
            >{link}</button>
          ))}
          <button className="btn-primary" onClick={() => scrollTo("contact")}
            style={{ padding:"9px 22px", fontSize:14, marginLeft:10, borderRadius:10 }}>
            Start Your Project
          </button>
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{
          background:"none", border:"none", cursor:"pointer", color:"#fff",
          display:"none", alignItems:"center", padding:4,
        }}>
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background:"rgba(6,8,20,.97)", backdropFilter:"blur(20px)",
          padding:"1rem 2rem 2rem", borderTop:"1px solid rgba(99,102,241,.2)",
          display:"flex", flexDirection:"column", gap:4,
        }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link)} style={{
              background:"none", border:"none", cursor:"pointer",
              color:"rgba(255,255,255,.85)", fontSize:16, fontWeight:500,
              padding:"11px 0", textAlign:"left", borderBottom:"1px solid rgba(255,255,255,.04)",
            }}>{link}</button>
          ))}
          <button className="btn-primary" onClick={() => scrollTo("contact")}
            style={{ padding:"13px 20px", fontSize:15, marginTop:12, borderRadius:10 }}>
            Start Your Project
          </button>
        </div>
      )}
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="home" className="grid-bg" style={{
      minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      position:"relative", overflow:"hidden", padding:"120px 2rem 100px",
    }}>
      <GlowOrb x="-120px" y="80px"  color="#3b82f6" size={650} opacity={0.13} />
      <GlowOrb x="58%"    y="30px"  color="#8b5cf6" size={520} opacity={0.10} />
      <GlowOrb x="25%"    y="62%"   color="#ec4899" size={420} opacity={0.07} />

      {/* Floating particles */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <div key={i} style={{
          position:"absolute",
          width: 2+(i%3), height: 2+(i%3),
          borderRadius:"50%",
          background:`hsla(${220+i*18},80%,70%,.65)`,
          left:`${8+i*12}%`, top:`${18+(i%4)*16}%`,
          animation:`float ${4.5+i*.5}s ease-in-out infinite`,
          animationDelay:`${i*.35}s`,
        }} />
      ))}

      <div style={{ maxWidth:860, textAlign:"center", position:"relative", zIndex:1 }}>
        {/* Badge */}
        <div style={{
          display:"inline-flex", alignItems:"center", gap:8,
          background:"rgba(99,102,241,.1)", border:"1px solid rgba(99,102,241,.3)",
          borderRadius:100, padding:"7px 20px", marginBottom:36,
          fontSize:13, color:"#a78bfa", fontWeight:500,
        }}>
          <HiSparkles size={14} color="#a78bfa" style={{ animation:"pulseGlow 2s infinite" }} />
          Web Design Studio 
        </div>

        <h1 style={{
          fontSize:"clamp(2.4rem,6.5vw,5.2rem)", fontWeight:900, lineHeight:1.1,
          marginBottom:28, letterSpacing:"-1px",
        }}>
          <span style={{ color:"#fff" }}>Modern Websites That</span><br />
          <span style={{
            background:"linear-gradient(135deg,#60a5fa 0%,#a78bfa 50%,#f472b6 100%)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          }}>Elevate Your Brand</span>
        </h1>

        <p style={{
          fontSize:"clamp(1rem,2.2vw,1.2rem)",
          color:"rgba(255,255,255,.58)", lineHeight:1.85,
          maxWidth:620, margin:"0 auto 52px",
        }}>
          Webdro creates modern responsive websites, portfolios, landing pages, and digital experiences
          for students, startups, creators, and businesses.
        </p>

        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
          <button className="btn-primary"
            onClick={() => document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})}
            style={{ padding:"15px 38px", fontSize:16, display:"flex", alignItems:"center", gap:8, borderRadius:12 }}>
            View Projects <FiArrowRight size={18} />
          </button>
          <button className="btn-ghost"
            onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
            style={{ padding:"15px 38px", fontSize:16, display:"flex", alignItems:"center", gap:8, borderRadius:12 }}>
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ padding:"100px clamp(1rem,4vw,3rem)", position:"relative", overflow:"hidden" }}>
      <GlowOrb x="72%" y="15%" color="#8b5cf6" size={520} opacity={0.08} />

      <div className="two-col" style={{
        maxWidth:1100, margin:"0 auto",
        display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center",
      }}>
        {/* Text */}
        <div style={{ animation:"fadeUp .9s ease forwards" }}>
          <div style={{ color:"#a78bfa", fontSize:13, fontWeight:600, letterSpacing:3, textTransform:"uppercase", marginBottom:16 }}>
            About Webdro
          </div>
          <h2 className="section-title" style={{ marginBottom:24, lineHeight:1.2 }}>
            We Build Digital Experiences That Matter
          </h2>
          <p style={{ color:"rgba(255,255,255,.6)", lineHeight:1.9, fontSize:16, marginBottom:22 }}>
            Webdro is a modern web design startup focused on creating responsive, visually stunning
            websites and digital experiences for students, creators, startups, and businesses.
          </p>
          <p style={{ color:"rgba(255,255,255,.48)", lineHeight:1.9, fontSize:15, marginBottom:36 }}>
            We combine technical precision with creative vision to deliver websites that don't just
            look good — they perform, convert, and leave a lasting impression.
          </p>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            {[
              [FiZap,          "Fast Delivery",  "#f59e0b"],
              [FiPenTool,      "Pixel Perfect",  "#a78bfa"],
              [FiSmartphone,   "Mobile First",   "#60a5fa"],
              [FiCode,         "Clean Code",     "#34d399"],
            ].map(([Icon, label, col]) => (
              <div key={label} style={{
                display:"flex", alignItems:"center", gap:12,
                background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)",
                borderRadius:12, padding:"13px 16px",
                transition:"border-color .3s, background .3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=`${col}55`; e.currentTarget.style.background="rgba(255,255,255,.055)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,.07)"; e.currentTarget.style.background="rgba(255,255,255,.03)"; }}
              >
                <Icon size={18} color={col} className="icon-lift" />
                <span style={{ color:"rgba(255,255,255,.8)", fontSize:14, fontWeight:500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual panel — dashboard / UI showcase */}
        <div style={{ position:"relative", height:440 }}>
          {/* Main UI card */}
          <div className="glass" style={{
            position:"absolute", top:0, left:0, right:0,
            borderRadius:24, overflow:"hidden", height:300,
            animation:"floatB 7s ease-in-out infinite",
            border:"1px solid rgba(99,102,241,.25)",
          }}>
            {/* fake browser chrome */}
            <div style={{ background:"rgba(255,255,255,.04)", padding:"10px 16px", display:"flex", alignItems:"center", gap:6, borderBottom:"1px solid rgba(255,255,255,.07)" }}>
              {["#ef4444","#f59e0b","#10b981"].map(c=>(
                <div key={c} style={{ width:10, height:10, borderRadius:"50%", background:c }} />
              ))}
              <div style={{ flex:1, marginLeft:10, background:"rgba(255,255,255,.06)", borderRadius:6, padding:"3px 10px", fontSize:11, color:"rgba(255,255,255,.3)" }}>
                webdro.in
              </div>
            </div>
            {/* dashboard preview */}
            <div style={{ padding:18, display:"flex", flexDirection:"column", gap:10 }}>
              <div style={{ display:"flex", gap:10 }}>
                {["#3b82f620","#8b5cf620","#ec489920"].map((bg,i)=>(
                  <div key={i} style={{ flex:1, background:bg, border:`1px solid ${["#3b82f6","#8b5cf6","#ec4899"][i]}30`, borderRadius:10, padding:"10px 12px" }}>
                    <div style={{ width:"60%", height:6, background:["#3b82f6","#8b5cf6","#ec4899"][i]+"90", borderRadius:4, marginBottom:6 }} />
                    <div style={{ fontSize:18, fontWeight:800, color:["#60a5fa","#a78bfa","#f472b6"][i] }}>{["12","8","★5"][i]}</div>
                    <div style={{ fontSize:10, color:"rgba(255,255,255,.35)" }}>{["Projects","Clients","Rating"][i]}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:"rgba(255,255,255,.03)", borderRadius:10, padding:12, display:"flex", flexDirection:"column", gap:6 }}>
                {[70,45,85].map((w,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ fontSize:10, color:"rgba(255,255,255,.4)", width:60 }}>{["React","Design","Deploy"][i]}</div>
                    <div style={{ flex:1, height:5, background:"rgba(255,255,255,.06)", borderRadius:4 }}>
                      <div style={{ width:`${w}%`, height:"100%", background:`linear-gradient(90deg,${["#3b82f6","#8b5cf6","#ec4899"][i]},${["#8b5cf6","#ec4899","#f97316"][i]})`, borderRadius:4 }} />
                    </div>
                    <div style={{ fontSize:10, color:"rgba(255,255,255,.4)" }}>{w}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating badge — bottom left */}
          <div style={{
            position:"absolute", bottom:0, left:0, width:"56%",
            background:"rgba(255,255,255,.03)", border:"1px solid rgba(99,102,241,.2)",
            borderRadius:18, padding:"20px 22px", backdropFilter:"blur(20px)",
            animation:"float 5s ease-in-out infinite", animationDelay:".8s",
          }}>
            <FiGlobe size={26} color="#60a5fa" style={{ marginBottom:8 }} />
            <div style={{ fontWeight:700, fontSize:15, color:"#fff", marginBottom:3 }}>100% Responsive</div>
            <div style={{ color:"rgba(255,255,255,.38)", fontSize:12 }}>Every device. Every screen.</div>
          </div>

          {/* Floating badge — bottom right */}
          <div style={{
            position:"absolute", bottom:0, right:0, width:"40%",
            background:"rgba(139,92,246,.08)", border:"1px solid rgba(139,92,246,.25)",
            borderRadius:18, padding:"20px 22px", backdropFilter:"blur(20px)",
            animation:"float 6s ease-in-out infinite", animationDelay:"1.5s",
          }}>
            <FiLayers size={26} color="#a78bfa" style={{ marginBottom:8 }} />
            <div style={{ fontWeight:700, fontSize:15, color:"#fff", marginBottom:3 }}>Modern Stack</div>
            <div style={{ color:"rgba(255,255,255,.38)", fontSize:12 }}>React · Tailwind · Vite</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────
function Services() {
  return (
    <section id="services" className="grid-bg" style={{ padding:"100px clamp(1rem,4vw,3rem)", position:"relative" }}>
      <GlowOrb x="15%" y="45%" color="#3b82f6" size={500} opacity={0.08} />

      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <div style={{ color:"#60a5fa", fontSize:13, fontWeight:600, letterSpacing:3, textTransform:"uppercase", marginBottom:16 }}>What We Do</div>
          <h2 className="section-title">Our Services</h2>
          <p style={{ color:"rgba(255,255,255,.5)", marginTop:16, fontSize:15, maxWidth:460, margin:"16px auto 0" }}>
            Everything you need to launch a powerful digital presence
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>
          {SERVICES.map(({ Icon, title, desc }, i) => (
            <div key={i} className="glass" style={{ padding:32 }}
              onMouseEnter={e => e.currentTarget.style.borderColor="rgba(99,102,241,.45)"}
              onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,.08)"}
            >
              <div style={{
                width:54, height:54, borderRadius:16,
                background:"linear-gradient(135deg,rgba(59,130,246,.18),rgba(139,92,246,.18))",
                border:"1px solid rgba(99,102,241,.2)",
                display:"flex", alignItems:"center", justifyContent:"center",
                marginBottom:20, transition:"all .3s",
              }}>
                <Icon size={24} color="#a78bfa" className="icon-lift" />
              </div>
              <h3 style={{ fontWeight:700, fontSize:18, color:"#fff", marginBottom:12 }}>{title}</h3>
              <p style={{ color:"rgba(255,255,255,.5)", fontSize:14, lineHeight:1.75 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Projects ──────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects" style={{ padding:"100px clamp(1rem,4vw,3rem)", position:"relative" }}>
      <GlowOrb x="68%" y="25%" color="#ec4899" size={420} opacity={0.07} />

      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <div style={{ color:"#f472b6", fontSize:13, fontWeight:600, letterSpacing:3, textTransform:"uppercase", marginBottom:16 }}>Our Work</div>
          <h2 className="section-title">Featured Projects</h2>
          <p style={{ color:"rgba(255,255,255,.5)", marginTop:16, fontSize:15, maxWidth:460, margin:"16px auto 0" }}>
          
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))", gap:28 }}>
          {PROJECTS.map((p, i) => <ProjectCard key={i} p={p} />)}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="proj-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius:20, overflow:"hidden", cursor:"pointer",
        border:`1px solid ${hovered ? p.color+"55" : "rgba(255,255,255,.07)"}`,
        transition:"all .4s ease",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? `0 28px 65px ${p.color}22` : "none",
        background:"rgba(255,255,255,.02)",
      }}
    >
      {/* Image */}
      <div style={{ height:210, overflow:"hidden", position:"relative" }}>
        <img
          src={p.image}
          alt={p.title}
          className="proj-img"
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
        />
        {/* overlay */}
        <div style={{
          position:"absolute", inset:0,
          background:`linear-gradient(to bottom, transparent 40%, rgba(6,8,20,.85) 100%)`,
          transition:"opacity .4s",
          opacity: hovered ? 1 : 0.7,
        }} />
        {/* color tint on hover */}
        <div style={{
          position:"absolute", inset:0,
          background:`${p.color}18`,
          opacity: hovered ? 1 : 0,
          transition:"opacity .4s",
        }} />
        {/* Tag */}
        <div style={{
          position:"absolute", top:12, right:12,
          background:`${p.color}22`, border:`1px solid ${p.color}55`,
          borderRadius:100, padding:"4px 12px", fontSize:11,
          color:p.color, fontWeight:700, backdropFilter:"blur(8px)",
        }}>{p.tag}</div>
        {/* Netlify badge */}
        <div style={{
          position:"absolute", top:12, left:12,
          background:"rgba(0,0,0,.5)", borderRadius:8, padding:"4px 8px",
          display:"flex", alignItems:"center", gap:5, backdropFilter:"blur(8px)",
        }}>
          <SiNetlify size={12} color="#00ad9f" />
          <span style={{ fontSize:10, color:"rgba(255,255,255,.6)" }}>Live</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding:"22px 24px 24px" }}>
        <h3 style={{ fontWeight:700, fontSize:17, color:"#fff", marginBottom:8 }}>{p.title}</h3>
        <p style={{ color:"rgba(255,255,255,.48)", fontSize:13, lineHeight:1.65, marginBottom:20 }}>{p.desc}</p>
        <a
          href={p.url} target="_blank" rel="noreferrer"
          style={{
            display:"inline-flex", alignItems:"center", gap:7,
            background: hovered ? `linear-gradient(135deg,${p.color},${p.color}bb)` : "transparent",
            border:`1px solid ${p.color}55`,
            color: hovered ? "#fff" : p.color,
            padding:"9px 20px", borderRadius:10,
            fontSize:13, fontWeight:600, textDecoration:"none",
            transition:"all .3s",
          }}
        >
          <FiExternalLink size={14} /> Live Preview
        </a>
      </div>
    </div>
  );
}

// ── FAQ ───────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" className="grid-bg" style={{ padding:"100px clamp(1rem,4vw,3rem)", position:"relative" }}>
      <GlowOrb x="48%" y="28%" color="#6366f1" size={420} opacity={0.08} />

      <div style={{ maxWidth:760, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <div style={{ color:"#a78bfa", fontSize:13, fontWeight:600, letterSpacing:3, textTransform:"uppercase", marginBottom:16 }}>Got Questions?</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {FAQS.map((faq, i) => (
            <div key={i}
              onClick={() => setOpen(open===i ? null : i)}
              style={{
                background: open===i ? "rgba(99,102,241,.09)" : "rgba(255,255,255,.02)",
                border:`1px solid ${open===i ? "rgba(99,102,241,.35)" : "rgba(255,255,255,.07)"}`,
                borderRadius:16, overflow:"hidden", cursor:"pointer",
                transition:"all .3s",
              }}
            >
              <div style={{ padding:"20px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:16 }}>
                <span style={{ fontWeight:600, color:"#fff", fontSize:15 }}>{faq.q}</span>
                <div style={{
                  width:28, height:28, borderRadius:"50%", flexShrink:0,
                  background: open===i ? "rgba(99,102,241,.25)" : "rgba(255,255,255,.05)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  transition:"all .3s",
                  transform: open===i ? "rotate(45deg)" : "rotate(0)",
                }}>
                  <FiArrowRight size={13} color={open===i ? "#a78bfa" : "rgba(255,255,255,.4)"} style={{ transform:"rotate(45deg)" }} />
                </div>
              </div>
              {open===i && (
                <div style={{ padding:"0 24px 20px", color:"rgba(255,255,255,.55)", fontSize:14, lineHeight:1.8, animation:"fadeUp .3s ease" }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────
function Contact() {
  const [form, setForm]   = useState({ name:"", email:"", message:"" });
  const [sent, setSent]   = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) { setError("Please fill all fields."); return; }
    setError("");
    window.open(
      `https://wa.me/918883091192?text=Hi Webdro!%20My%20name%20is%20${encodeURIComponent(form.name)}.%20${encodeURIComponent(form.message)}`,
      "_blank"
    );
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name:"", email:"", message:"" }); }, 3500);
  };

  const inp = {
    width:"100%", background:"rgba(255,255,255,.04)",
    border:"1px solid rgba(255,255,255,.1)", borderRadius:12,
    color:"#fff", padding:"14px 16px", fontSize:15, outline:"none",
    transition:"border-color .3s",
  };

  return (
    <section id="contact" style={{ padding:"100px clamp(1rem,4vw,3rem)", position:"relative" }}>
      <GlowOrb x="15%" y="45%" color="#3b82f6" size={520} opacity={0.08} />
      <GlowOrb x="68%" y="25%" color="#ec4899" size={420} opacity={0.07} />

      <div className="contact-grid" style={{
        maxWidth:1100, margin:"0 auto",
        display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"start",
      }}>
        {/* Info */}
        <div>
          <div style={{ color:"#60a5fa", fontSize:13, fontWeight:600, letterSpacing:3, textTransform:"uppercase", marginBottom:16 }}>Let's Connect</div>
          <h2 className="section-title" style={{ marginBottom:22, lineHeight:1.2 }}>Start Your Project Today</h2>
          <p style={{ color:"rgba(255,255,255,.5)", fontSize:16, lineHeight:1.85, marginBottom:46 }}>
            Ready to launch your next digital experience? Let's talk about your vision and bring it to life.
          </p>

          <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
            {[
              { Icon:FaEnvelope,     label:"Email",     val:"webdro26@gmail.com",    href:"mailto:webdro26@gmail.com", color:"#60a5fa" },
              { Icon:FaPhone,        label:"Phone",     val:"+91 88830 91192",        href:"tel:+918883091192",         color:"#34d399" },
              { Icon:FaMapMarkerAlt, label:"Location",  val:"Chennai, Tamil Nadu",    href:null,                       color:"#f472b6" },
              { Icon:FaInstagram,    label:"Instagram", val:"@webdro26",              href:"https://instagram.com/webdro26", color:"#e1306c" },
            ].map(({ Icon, label, val, href, color }) => (
              <div key={label} style={{ display:"flex", alignItems:"center", gap:16 }}>
                <div style={{
                  width:48, height:48, borderRadius:14, flexShrink:0,
                  background:`${color}18`, border:`1px solid ${color}35`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  <Icon size={19} color={color} className="icon-lift" />
                </div>
                <div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,.32)", textTransform:"uppercase", letterSpacing:1.2, marginBottom:2 }}>{label}</div>
                  {href
                    ? <a href={href} target="_blank" rel="noreferrer" style={{ color:"#60a5fa", fontSize:15, fontWeight:500, textDecoration:"none" }}>{val}</a>
                    : <div style={{ color:"#fff", fontSize:15, fontWeight:500 }}>{val}</div>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="glass" style={{ padding:40 }}>
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            <div>
              <label style={{ fontSize:13, color:"rgba(255,255,255,.45)", display:"block", marginBottom:8 }}>Your Name</label>
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
                placeholder="e.g. Arjun Sharma" style={inp}
                onFocus={e=>e.target.style.borderColor="rgba(99,102,241,.65)"}
                onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.1)"} />
            </div>
            <div>
              <label style={{ fontSize:13, color:"rgba(255,255,255,.45)", display:"block", marginBottom:8 }}>Email Address</label>
              <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
                placeholder="you@email.com" type="email" style={inp}
                onFocus={e=>e.target.style.borderColor="rgba(99,102,241,.65)"}
                onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.1)"} />
            </div>
            <div>
              <label style={{ fontSize:13, color:"rgba(255,255,255,.45)", display:"block", marginBottom:8 }}>Your Message</label>
              <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})}
                placeholder="Tell us about your project..." rows={5}
                style={{ ...inp, resize:"vertical" }}
                onFocus={e=>e.target.style.borderColor="rgba(99,102,241,.65)"}
                onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.1)"} />
            </div>
            {error && <p style={{ color:"#f87171", fontSize:13, marginTop:-8 }}>{error}</p>}
            <button className="btn-primary" onClick={handleSubmit} style={{
              padding:16, fontSize:16,
              background: sent ? "linear-gradient(135deg,#10b981,#059669)" : undefined,
              boxShadow: sent ? "0 0 28px rgba(16,185,129,.4)" : undefined,
              display:"flex", alignItems:"center", justifyContent:"center", gap:10,
              borderRadius:12,
            }}>
              {sent
                ? <><FiCheckCircle size={18} /> Message Sent!</>
                : <><FaWhatsapp size={18} /> Send via WhatsApp</>
              }
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  const [imgError, setImgError] = useState(false);
  return (
    <footer style={{
      padding:"56px clamp(1rem,4vw,3rem) 36px",
      borderTop:"1px solid rgba(255,255,255,.06)",
      background:"rgba(0,0,0,.3)",
    }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:24, marginBottom:36 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
              {!imgError
                ? <img src={webdroLogo} alt="Webdro" onError={()=>setImgError(true)}
                    style={{ height:38, width:"auto", objectFit:"contain", filter:"drop-shadow(0 0 8px rgba(139,92,246,.5))" }} />
                : <span style={{
                    fontSize:20, fontWeight:800,
                    background:"linear-gradient(90deg,#60a5fa,#a78bfa,#f472b6)",
                    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                  }}>webdro</span>
              }
            </div>
            <p style={{ color:"rgba(255,255,255,.32)", fontSize:13 }}>Building modern digital experiences.</p>
          </div>

          <div style={{ display:"flex", gap:12 }}>
            {[
              { Icon:FaInstagram, href:"https://instagram.com/webdro26",    color:"#e1306c" },
              { Icon:FaEnvelope,  href:"mailto:webdro26@gmail.com",          color:"#60a5fa" },
              { Icon:FaPhone,     href:"tel:+918883091192",                  color:"#21835f" },
              { Icon:FaWhatsapp,  href:"https://wa.me/918883091192",         color:"#25d366" },
            ].map(({ Icon, href, color }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer" style={{
                width:42, height:42, borderRadius:11,
                background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)",
                display:"flex", alignItems:"center", justifyContent:"center",
                textDecoration:"none", transition:"all .25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background=`${color}22`; e.currentTarget.style.borderColor=`${color}55`; e.currentTarget.style.transform="translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,.04)"; e.currentTarget.style.borderColor="rgba(255,255,255,.08)"; e.currentTarget.style.transform="translateY(0)"; }}
              >
                <Icon size={17} color={color} />
              </a>
            ))}
          </div>
        </div>

        <div style={{
          borderTop:"1px solid rgba(255,255,255,.05)", paddingTop:22,
          display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10,
        }}>
          <span style={{ color:"rgba(255,255,255,.28)", fontSize:13 }}>© 2025 Webdro. All rights reserved.</span>
          <span style={{ color:"rgba(255,255,255,.28)", fontSize:13 }}>Designed by Webdro</span>
        </div>
      </div>
    </footer>
  );
}

// ── Floating WhatsApp ─────────────────────────────────────────
function WhatsApp() {
  return (
    <a href="https://wa.me/918883091192?text=Hi%20Webdro!%20I'm%20interested%20in%20your%20web%20design%20services."
      target="_blank" rel="noreferrer" title="Chat on WhatsApp"
      style={{
        position:"fixed", bottom:28, right:28, zIndex:1000,
        width:58, height:58, borderRadius:"50%",
        background:"linear-gradient(135deg,#25d366,#128c7e)",
        display:"flex", alignItems:"center", justifyContent:"center",
        textDecoration:"none",
        boxShadow:"0 4px 28px rgba(37,211,102,.5)",
        transition:"all .3s",
        animation:"floatB 3s ease-in-out infinite",
      }}

      onMouseEnter={e => { e.currentTarget.style.transform="scale(1.15)"; e.currentTarget.style.boxShadow="0 8px 42px rgba(37,211,102,.75)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform="scale(1)";    e.currentTarget.style.boxShadow="0 4px 28px rgba(37,211,102,.5)"; }}
    >
      <FaWhatsapp size={26} color="#fff" />
    </a>
  );
}

// ── Root ──────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("Home");

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div style={{ background:"#060814", minHeight:"100vh", color:"#fff" }}>
        <Navbar active={active} setActive={setActive} />
        <Hero />
        <About />
        <Services />
        <Projects />
        <FAQ />
        <Contact />
        <Footer />
        <WhatsApp />
      </div>
    </>
  );
}


