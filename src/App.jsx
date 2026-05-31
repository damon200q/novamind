import { useState, useEffect, useRef, useCallback } from "react";

/* ─── DATA ─── */
const SERVICES = [
  { id: "01", title: "Conversational\nAgents", desc: "AI-powered chat & voice agents that handle customer inquiries, qualify leads, and close deals — 24/7, in 40+ languages.", stat: "85%", statLabel: "resolution rate" },
  { id: "02", title: "Workflow\nAutomation", desc: "Intelligent agents that connect your CRM, email, Slack & 200+ tools — eliminating manual busywork forever.", stat: "40h", statLabel: "saved per week" },
  { id: "03", title: "Data & Analytics\nAgents", desc: "From raw data to boardroom-ready insights. Agents that analyze, visualize, and recommend — in seconds.", stat: "10x", statLabel: "faster insights" },
  { id: "04", title: "Content\nEngines", desc: "Multi-platform content creation at scale. Blog posts, social, email sequences — all on-brand, all on autopilot.", stat: "20x", statLabel: "output volume" },
  { id: "05", title: "Knowledge\nBase RAG", desc: "Enterprise search that actually works. RAG-powered agents that surface the right answer from millions of docs.", stat: "98%", statLabel: "retrieval accuracy" },
  { id: "06", title: "Custom Agent\nDevelopment", desc: "Bespoke AI agents built for your unique business logic. If you can describe it, we can build it.", stat: "∞", statLabel: "possibilities" },
];

const TESTIMONIALS = [
  { name: "Sarah Chen", role: "VP Operations, Meridian Health", quote: "They deployed a patient intake agent in 11 days. Our admin workload dropped by 60% overnight.", avatar: "SC" },
  { name: "Marcus Webb", role: "CTO, Stackline Commerce", quote: "We evaluated 8 agencies. Bloomstrack was the only one that delivered production-grade agents, not demos.", avatar: "MW" },
  { name: "Lisa Kowalski", role: "Head of CS, FinLeap", quote: "Our CSAT went from 72% to 94%. The agents handle edge cases better than most humans on our team.", avatar: "LK" },
];

const LOGOS = ["Stripe", "Notion", "Vercel", "Linear", "Figma", "Datadog", "Loom", "Retool"];

const PROCESS = [
  { n: "01", title: "Discovery", desc: "We audit your workflows, find the highest-ROI automation targets, and map the agent architecture.", duration: "Week 1" },
  { n: "02", title: "Build", desc: "Rapid development with weekly demos. You see progress, not just promises.", duration: "Week 2–3" },
  { n: "03", title: "Ship", desc: "Battle-tested deployment into your stack with monitoring, fallbacks, and human handoff built in.", duration: "Week 4" },
  { n: "04", title: "Scale", desc: "Continuous optimization driven by real usage data. Your agents get smarter every day.", duration: "Ongoing" },
];

const PRICING = [
  {
    tier: "Starter",
    price: "$3,500",
    unit: "one-time",
    desc: "Perfect for testing the waters with your first AI agent.",
    features: ["1 custom AI agent", "Basic integrations (up to 3)", "2 rounds of revision", "14-day delivery", "30 days of support"],
    accent: false,
  },
  {
    tier: "Growth",
    price: "$7,500",
    unit: "one-time",
    desc: "For teams ready to automate multiple workflows.",
    features: ["Up to 3 AI agents", "Advanced integrations (unlimited)", "Multi-agent orchestration", "10-day delivery", "90 days of support", "Performance dashboard"],
    accent: true,
    badge: "Most Popular",
  },
  {
    tier: "Partner",
    price: "$4,000",
    unit: "/ month",
    desc: "Ongoing agent development, optimization & strategy.",
    features: ["Unlimited agent builds", "Dedicated agent architect", "Weekly performance reviews", "Priority Slack support", "Custom training & RAG", "Revenue-share options"],
    accent: false,
  },
];

/* ─── HOOKS ─── */
function useInView(threshold = 0.18) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function AnimatedCounter({ value, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView(0.5);
  const isNum = !isNaN(parseInt(value));
  useEffect(() => {
    if (!visible || !isNum) return;
    const target = parseInt(value);
    const step = Math.ceil(target / (duration / 16));
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(current);
    }, 16);
    return () => clearInterval(timer);
  }, [visible, value, isNum, duration]);
  return <span ref={ref}>{isNum ? count + suffix : value}</span>;
}

/* ─── REVEAL ─── */
function Reveal({ children, delay = 0, direction = "up", className = "", style = {} }) {
  const [ref, visible] = useInView();
  const tr = { up: "translateY(60px)", down: "translateY(-60px)", left: "translateX(60px)", right: "translateX(-60px)", none: "none" };
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : tr[direction],
      transition: `opacity 0.9s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.9s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ─── ICONS ─── */
const Icons = {
  mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
  ),
  x: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  ),
  whatsapp: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  ),
  send: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
};

/* ════════════════════════ MAIN ════════════════════════ */
export default function Bloomstrack() {
  const [scrollY, setScrollY] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef();

  // Contact form
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  }, []);

  const handleSubmit = () => {
    if (form.email.includes("@") && form.name.trim()) setSent(true);
  };

  return (
    <div style={{ background: "#050505", color: "#f0f0f0", minHeight: "100vh", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap');

        :root {
          --accent: #c8ff00;
          --accent2: #a8e600;
          --accent-dim: rgba(200,255,0,0.12);
          --surface: rgba(255,255,255,0.03);
          --border: rgba(255,255,255,0.07);
          --text-primary: #f0f0f0;
          --text-secondary: rgba(255,255,255,0.45);
          --text-tertiary: rgba(255,255,255,0.2);
          --font-display: 'Syne', sans-serif;
          --font-body: 'DM Sans', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: var(--accent); color: #050505; }

        @keyframes auroraShift {
          0% { transform: translate(-30%, -30%) rotate(0deg) scale(1); }
          33% { transform: translate(20%, -20%) rotate(120deg) scale(1.1); }
          66% { transform: translate(-10%, 20%) rotate(240deg) scale(0.95); }
          100% { transform: translate(-30%, -30%) rotate(360deg) scale(1); }
        }
        @keyframes auroraShift2 {
          0% { transform: translate(30%, 30%) rotate(0deg) scale(1.1); }
          33% { transform: translate(-20%, 10%) rotate(-120deg) scale(1); }
          66% { transform: translate(10%, -20%) rotate(-240deg) scale(1.15); }
          100% { transform: translate(30%, 30%) rotate(-360deg) scale(1.1); }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0,0); }
          10% { transform: translate(-5%,-10%); }
          30% { transform: translate(7%,-25%); }
          50% { transform: translate(-15%,10%); }
          70% { transform: translate(0%,15%); }
          90% { transform: translate(-10%,10%); }
        }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes successPop {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }

        .grain-overlay {
          position: fixed; inset: 0; pointer-events: none; z-index: 9999;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 128px 128px;
          animation: grain 0.5s steps(1) infinite;
        }

        .nav-link {
          color: var(--text-secondary); text-decoration: none;
          font-family: var(--font-mono); font-size: 12px;
          letter-spacing: 2px; text-transform: uppercase;
          transition: color 0.3s; position: relative;
        }
        .nav-link:hover { color: var(--accent); }
        .nav-link::after {
          content: ''; position: absolute; bottom: -4px; left: 0;
          width: 0; height: 1px; background: var(--accent); transition: width 0.3s;
        }
        .nav-link:hover::after { width: 100%; }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(48px, 8.5vw, 116px);
          font-weight: 800; line-height: 0.95;
          letter-spacing: -3px; text-transform: uppercase;
        }

        .service-row {
          display: grid; grid-template-columns: 80px 1fr 1fr 120px;
          gap: 32px; align-items: center; padding: 36px 0;
          border-bottom: 1px solid var(--border); cursor: pointer;
          transition: all 0.5s cubic-bezier(.16,1,.3,1); position: relative;
        }
        .service-row::before {
          content: ''; position: absolute; left: -40px; right: -40px; top: 0; bottom: 0;
          background: transparent; transition: background 0.5s; border-radius: 4px; z-index: -1;
        }
        .service-row:hover::before { background: rgba(200,255,0,0.03); }
        .service-row:hover, .service-row.active { padding-left: 12px; }
        .service-row.active::before { background: rgba(200,255,0,0.04); }

        .cta-primary {
          background: var(--accent); color: #050505; border: none;
          padding: 18px 48px; border-radius: 0;
          font-family: var(--font-display); font-size: 15px;
          font-weight: 700; text-transform: uppercase; letter-spacing: 2px;
          cursor: pointer; transition: all 0.3s; position: relative; overflow: hidden;
        }
        .cta-primary::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: translateX(-100%); transition: transform 0.5s;
        }
        .cta-primary:hover::after { transform: translateX(100%); }
        .cta-primary:hover { box-shadow: 0 0 40px rgba(200,255,0,0.3); transform: translateY(-2px); }

        .cta-ghost {
          background: transparent; color: var(--text-primary);
          border: 1px solid var(--border); padding: 18px 48px; border-radius: 0;
          font-family: var(--font-display); font-size: 15px;
          font-weight: 600; text-transform: uppercase; letter-spacing: 2px;
          cursor: pointer; transition: all 0.3s;
        }
        .cta-ghost:hover { border-color: var(--accent); color: var(--accent); }

        .testimonial-card {
          background: var(--surface); border: 1px solid var(--border);
          padding: 40px; position: relative; transition: all 0.4s;
        }
        .testimonial-card:hover { border-color: rgba(200,255,0,0.2); background: rgba(200,255,0,0.02); }

        .process-card {
          padding: 40px 0; border-bottom: 1px solid var(--border);
          display: grid; grid-template-columns: 80px 200px 1fr 100px;
          gap: 32px; align-items: start; transition: all 0.4s;
        }
        .process-card:hover { padding-left: 12px; }

        .form-input {
          background: rgba(255,255,255,0.04); border: 1px solid var(--border);
          padding: 16px 20px; color: var(--text-primary);
          font-family: var(--font-body); font-size: 15px;
          outline: none; width: 100%; transition: all 0.3s;
        }
        .form-input:focus { border-color: var(--accent); box-shadow: 0 0 0 2px rgba(200,255,0,0.06); background: rgba(200,255,0,0.02); }
        .form-input::placeholder { color: var(--text-tertiary); }

        .social-pill {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 12px 20px; border: 1px solid var(--border);
          color: var(--text-secondary); text-decoration: none;
          font-family: var(--font-mono); font-size: 12px;
          letter-spacing: 1px; transition: all 0.3s; cursor: pointer;
          background: transparent;
        }
        .social-pill:hover { border-color: var(--accent); color: var(--accent); background: rgba(200,255,0,0.03); transform: translateY(-2px); }

        .pricing-card {
          background: var(--surface); border: 1px solid var(--border);
          padding: 40px; position: relative; transition: all 0.4s;
        }
        .pricing-card:hover { transform: translateY(-6px); }
        .pricing-card.featured {
          border-color: rgba(200,255,0,0.25);
          background: rgba(200,255,0,0.03);
        }
        .pricing-card.featured:hover { box-shadow: 0 20px 60px rgba(200,255,0,0.1); }

        .section-label {
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 4px; text-transform: uppercase;
          color: var(--accent); margin-bottom: 24px;
          display: flex; align-items: center; gap: 16px;
        }
        .section-label::before { content: ''; width: 40px; height: 1px; background: var(--accent); }

        .section-title {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 800; letter-spacing: -2px; line-height: 1.05;
        }

        .stat-badge { font-family: var(--font-mono); font-size: 32px; font-weight: 700; color: var(--accent); line-height: 1; }

        @media (max-width: 900px) {
          .service-row { grid-template-columns: 1fr; gap: 12px; }
          .process-card { grid-template-columns: 1fr; gap: 12px; }
          .hero-title { letter-spacing: -1px; }
        }
      `}</style>

      <div className="grain-overlay" />

      {/* ═══════ NAV ═══════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 80 ? "rgba(5,5,5,0.92)" : "transparent",
        backdropFilter: scrollY > 80 ? "blur(24px) saturate(1.5)" : "none",
        borderBottom: scrollY > 80 ? "1px solid var(--border)" : "1px solid transparent",
        transition: "all 0.4s", padding: "0 clamp(24px, 5vw, 80px)",
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 8, height: 8, background: "var(--accent)", borderRadius: "50%", position: "relative" }}>
              <div style={{ position: "absolute", inset: -4, border: "1px solid var(--accent)", borderRadius: "50%", animation: "pulseRing 2s ease-out infinite" }} />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px", textTransform: "uppercase" }}>Bloomstrack</span>
          </div>
          <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
            {["Services", "Process", "Pricing", "Contact"].map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} className="nav-link">{s}</a>
            ))}
            <a href="#contact" className="cta-primary" style={{ padding: "10px 28px", fontSize: 12, textDecoration: "none" }}>Get in Touch</a>
          </div>
        </div>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section ref={heroRef} onMouseMove={handleMouseMove} style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        padding: "140px clamp(24px, 5vw, 80px) 80px",
      }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", width: "120%", height: "120%", top: "-10%", left: "-10%", background: `radial-gradient(ellipse 600px 400px at ${30 + mousePos.x * 20}% ${30 + mousePos.y * 15}%, rgba(200,255,0,0.08), transparent 60%)`, animation: "auroraShift 20s ease-in-out infinite", transition: "background 0.8s ease-out" }} />
          <div style={{ position: "absolute", width: "120%", height: "120%", top: "-10%", left: "-10%", background: `radial-gradient(ellipse 500px 500px at ${60 + mousePos.x * 10}% ${50 + mousePos.y * 10}%, rgba(100,120,255,0.05), transparent 60%)`, animation: "auroraShift2 25s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: "100%", height: "100%", background: `radial-gradient(ellipse 400px 300px at ${70 + mousePos.x * 15}% ${70 + mousePos.y * 12}%, rgba(255,100,200,0.03), transparent 60%)`, animation: "auroraShift 30s ease-in-out 5s infinite" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "80px 80px", maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)", WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)" }} />

        <div style={{ maxWidth: 1400, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <Reveal><div className="section-label" style={{ marginBottom: 40 }}>AI Agent Agency — Est. 2024</div></Reveal>
          <Reveal delay={0.1}>
            <h1 className="hero-title">
              We build <br />
              <span style={{ color: "var(--accent)", display: "inline-block", position: "relative" }}>
                AI Agents
                <svg viewBox="0 0 400 12" style={{ position: "absolute", bottom: -8, left: 0, width: "100%", height: 12, overflow: "visible" }}><path d="M0 6 Q100 0 200 6 Q300 12 400 6" fill="none" stroke="var(--accent)" strokeWidth="2" opacity="0.4" /></svg>
              </span>
              <br />that actually<br />
              <span style={{ fontStyle: "italic", fontWeight: 400, letterSpacing: 0 }}>work.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", maxWidth: 900, gap: 60, marginTop: 64 }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "var(--text-secondary)", lineHeight: 1.7, fontWeight: 300 }}>
                Not chatbot demos. Not vaporware. Production-grade AI agents
                that plug into your stack, handle real work, and pay for
                themselves in weeks — not months.
              </p>
              <div>
                <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
                  <a href="#contact" className="cta-primary" style={{ textDecoration: "none" }}>Start a project →</a>
                  <a href="#pricing" className="cta-ghost" style={{ textDecoration: "none" }}>See pricing</a>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-tertiary)", letterSpacing: 1 }}>
                  <span style={{ color: "var(--accent)", animation: "blink 1.5s step-end infinite", marginRight: 4 }}>●</span>
                  Typically reply within 4 hours
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <div style={{ display: "flex", gap: 64, marginTop: 100, paddingTop: 40, borderTop: "1px solid var(--border)", flexWrap: "wrap" }}>
              {[
                { value: "150", suffix: "+", label: "Agents shipped" },
                { value: "96", suffix: "%", label: "Client retention" },
                { value: "14", suffix: "d", label: "Avg. time to deploy" },
                { value: "4", suffix: ".2x", label: "Avg. ROI first quarter" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="stat-badge"><AnimatedCounter value={s.value} suffix={s.suffix} /></div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-tertiary)", marginTop: 8, letterSpacing: 2, textTransform: "uppercase" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ LOGO BAR ═══════ */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", overflow: "hidden", padding: "24px 0", position: "relative" }}>
        <div style={{ display: "flex", gap: 64, animation: "marquee 25s linear infinite", width: "max-content" }}>
          {[...LOGOS, ...LOGOS, ...LOGOS].map((l, i) => (
            <span key={i} style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 3, whiteSpace: "nowrap" }}>{l}</span>
          ))}
        </div>
        <div style={{ position: "absolute", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-tertiary)", right: 40, top: "50%", transform: "translateY(-50%)", letterSpacing: 2, textTransform: "uppercase", background: "#050505", padding: "0 12px" }}>Trusted by</div>
      </div>

      {/* ═══════ SERVICES ═══════ */}
      <section id="services" style={{ padding: "140px clamp(24px, 5vw, 80px)", position: "relative" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Reveal>
            <div className="section-label">What We Build</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 80, flexWrap: "wrap", gap: 24 }}>
              <h2 className="section-title" style={{ maxWidth: 600 }}>Six agent types.<br /><span style={{ color: "var(--text-tertiary)" }}>Infinite configurations.</span></h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)", maxWidth: 360, fontSize: 15, lineHeight: 1.7 }}>Every agent is custom-built for your business logic, your data, and your stack. No templates. No shortcuts.</p>
            </div>
          </Reveal>
          <div>
            {SERVICES.map((s, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className={`service-row ${activeService === i ? "active" : ""}`} onClick={() => setActiveService(i)} onMouseEnter={() => setActiveService(i)}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-tertiary)", letterSpacing: 1 }}>{s.id}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, letterSpacing: "-1px", lineHeight: 1.15, whiteSpace: "pre-line", transition: "color 0.3s", color: activeService === i ? "var(--accent)" : "var(--text-primary)" }}>{s.title}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.6, maxHeight: activeService === i ? 200 : 0, overflow: "hidden", opacity: activeService === i ? 1 : 0, transition: "all 0.5s cubic-bezier(.16,1,.3,1)" }}>{s.desc}</p>
                  <div style={{ textAlign: "right" }}>
                    <div className="stat-badge" style={{ fontSize: 24 }}>{s.stat}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-tertiary)", letterSpacing: 1, textTransform: "uppercase", marginTop: 4 }}>{s.statLabel}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROCESS ═══════ */}
      <section id="process" style={{ padding: "140px clamp(24px, 5vw, 80px)", background: "rgba(200,255,0,0.01)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Reveal>
            <div className="section-label">How It Works</div>
            <h2 className="section-title" style={{ marginBottom: 80 }}>From zero to production<br /><span style={{ color: "var(--accent)" }}>in four weeks.</span></h2>
          </Reveal>
          {PROCESS.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="process-card">
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 36, fontWeight: 700, color: "rgba(200,255,0,0.15)", lineHeight: 1 }}>{p.n}</div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 4 }}>{p.title}</h3>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", letterSpacing: 2, textTransform: "uppercase", opacity: 0.7 }}>{p.duration}</div>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.7 }}>{p.desc}</p>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--text-tertiary)", textAlign: "right" }}>→</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════ PRICING ═══════ */}
      <section id="pricing" style={{ padding: "140px clamp(24px, 5vw, 80px)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Reveal>
            <div className="section-label">Pricing</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 80, flexWrap: "wrap", gap: 24 }}>
              <h2 className="section-title">Transparent pricing.<br /><span style={{ color: "var(--text-tertiary)" }}>No surprises.</span></h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)", maxWidth: 360, fontSize: 15, lineHeight: 1.7 }}>Every project includes a detailed scope document before we charge a cent. Custom quotes available for enterprise.</p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
            {PRICING.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`pricing-card ${p.accent ? "featured" : ""}`} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  {p.badge && (
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#050505", background: "var(--accent)", padding: "6px 14px", display: "inline-block", marginBottom: 24, alignSelf: "flex-start", fontWeight: 700 }}>{p.badge}</div>
                  )}
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{p.tier}</h3>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 40, fontWeight: 700, color: p.accent ? "var(--accent)" : "var(--text-primary)" }}>{p.price}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-tertiary)" }}>{p.unit}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 32 }}>{p.desc}</p>
                  <div style={{ flex: 1 }}>
                    {p.features.map((f, fi) => (
                      <div key={fi} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                        {Icons.check}
                        <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-secondary)" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#contact" style={{ display: "block", textAlign: "center", marginTop: 32, padding: "16px 0", fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s", ...(p.accent ? { background: "var(--accent)", color: "#050505" } : { border: "1px solid var(--border)", color: "var(--text-primary)" }) }}
                    onMouseOver={e => { if (!p.accent) { e.target.style.borderColor = "var(--accent)"; e.target.style.color = "var(--accent)"; } }}
                    onMouseOut={e => { if (!p.accent) { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text-primary)"; } }}>
                    Get started
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section style={{ padding: "140px clamp(24px, 5vw, 80px)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Reveal>
            <div className="section-label">Client Results</div>
            <h2 className="section-title" style={{ marginBottom: 80 }}>Don't take our word for it.</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="testimonial-card">
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 48, color: "var(--accent)", opacity: 0.2, marginBottom: 16, lineHeight: 1 }}>"</div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.7, color: "var(--text-primary)", marginBottom: 32, fontStyle: "italic", fontWeight: 300 }}>{t.quote}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, rgba(200,255,0,0.2), rgba(100,120,255,0.2))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "var(--accent)" }}>{t.avatar}</div>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>{t.name}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-tertiary)", letterSpacing: 1, marginTop: 2 }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ BIG STATEMENT ═══════ */}
      <section style={{ padding: "140px clamp(24px, 5vw, 80px)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4.5vw, 56px)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-1.5px", maxWidth: 1000, margin: "0 auto" }}>
              The companies that win the next decade won't have the
              <span style={{ color: "var(--text-tertiary)" }}> biggest teams </span>
              — they'll have the
              <span style={{ color: "var(--accent)" }}> smartest agents.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" style={{ padding: "140px clamp(24px, 5vw, 80px)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>

              {/* LEFT — FORM */}
              <div>
                <div className="section-label">Get in Touch</div>
                <h2 className="section-title" style={{ marginBottom: 16 }}>
                  Let's build<br /><span style={{ color: "var(--accent)" }}>something real.</span>
                </h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 40 }}>
                  Tell us about your project. We'll get back with a tailored proposal — no generic sales pitch, no 47-slide deck.
                </p>

                {sent ? (
                  <div style={{ animation: "successPop 0.5s ease-out forwards", background: "rgba(200,255,0,0.05)", border: "1px solid rgba(200,255,0,0.2)", padding: 40, textAlign: "center" }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Message received.</div>
                    <div style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)", fontSize: 15 }}>We'll reply within 4 hours during business days.</div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 8, display: "block" }}>Name *</label>
                        <input className="form-input" placeholder="Jane Smith" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)} />
                      </div>
                      <div>
                        <label style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 8, display: "block" }}>Email *</label>
                        <input className="form-input" type="email" placeholder="jane@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)} />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 8, display: "block" }}>Company</label>
                      <input className="form-input" placeholder="Acme Inc." value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 8, display: "block" }}>Tell us about your project</label>
                      <textarea className="form-input" rows={4} placeholder="We're looking for an AI agent that..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: "vertical", minHeight: 100 }} />
                    </div>
                    <button className="cta-primary" onClick={handleSubmit} style={{ alignSelf: "flex-start", marginTop: 8, display: "flex", alignItems: "center", gap: 10 }}>
                      {Icons.send} Send message
                    </button>
                  </div>
                )}
              </div>

              {/* RIGHT — ALTERNATIVE CONTACT + STATS */}
              <div>
                <div style={{ marginBottom: 48 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 20 }}>Or reach out directly</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <a href="mailto:hello@bloomstrack.com" className="social-pill">{Icons.mail} hello@bloomstrack.com</a>
                    <a href="#" className="social-pill">{Icons.whatsapp} WhatsApp</a>
                    <a href="#" className="social-pill">{Icons.linkedin} LinkedIn</a>
                    <a href="#" className="social-pill">{Icons.x} @bloomstrack</a>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 40, marginBottom: 40 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 20 }}>Free resource</div>
                  <div style={{ background: "linear-gradient(135deg, rgba(200,255,0,0.06), rgba(100,120,255,0.04))", border: "1px solid rgba(200,255,0,0.15)", padding: 28, cursor: "pointer", transition: "all 0.3s" }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(200,255,0,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(200,255,0,0.15)"; e.currentTarget.style.transform = "none"; }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--accent)", marginBottom: 12, opacity: 0.8 }}>PDF Guide</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>The AI Agent Playbook</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>12-page guide: how to identify your highest-ROI agent opportunities and avoid the top 5 deployment mistakes.</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", marginTop: 16 }}>Download free →</div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                  {[
                    { label: "Response time", value: "< 4 hrs" },
                    { label: "First deploy", value: "2 weeks" },
                    { label: "Client NPS", value: "82" },
                    { label: "Uptime SLA", value: "99.9%" },
                  ].map((item, i) => (
                    <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 28, textAlign: "center" }}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 24, fontWeight: 700, color: "var(--accent)", marginBottom: 6 }}>{item.value}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-tertiary)", letterSpacing: 2, textTransform: "uppercase" }}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "40px clamp(24px, 5vw, 80px)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 6, height: 6, background: "var(--accent)", borderRadius: "50%" }} />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, textTransform: "uppercase", letterSpacing: 1 }}>Bloomstrack</span>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-tertiary)", letterSpacing: 1 }}>© 2026 Bloomstrack Agency. All rights reserved.</div>
          <div style={{ display: "flex", gap: 32 }}>
            {["X / Twitter", "LinkedIn", "GitHub", "Email"].map(s => (
              <a key={s} href="#" className="nav-link" style={{ fontSize: 11 }}>{s}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
