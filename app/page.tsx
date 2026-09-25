"use client";

import { useEffect, useState } from "react";

function RocketSequence() {
  return (
    <>
      <div className="flight-path" aria-hidden="true">
        <div className="rocket">
          <img src="/mars-industrial-booster-pointed.webp" alt="" />
          <span className="flame" /><span className="exhaust-beam" />
          <span className="particles"><b /><b /><b /><b /><b /><b /></span>
        </div>
      </div>
    </>
  );
}

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className={`brand-lockup ${inverse ? "inverse" : ""}`}>
      <span className="brand-image"><img src="/mars-logo.svg" alt="MARS rocket logo" /></span>
      <span className="brand-name">MARS</span>
    </div>
  );
}

const applications = [
  { id: "risk", name: "MARS Risk Report", category: "RISK", description: "Review portfolio risk and exposure.", mark: "△", tone: "indigo" },
  { id: "market", name: "MARS Market Data", category: "MARKET DATA", description: "Explore live and reference market data.", mark: "⌁", tone: "green" },
  { id: "pricer", name: "MARS Pricer", category: "PRICER", description: "Price trades and run scenarios.", mark: "$", tone: "blue" },
  { id: "compression", name: "MARS Compression", category: "COMPRESSION", description: "Optimize and reduce portfolio notional.", mark: "↗", tone: "amber" },
  { id: "beacon", name: "MARS Beacon", category: "BEACON", description: "Monitor alerts and operational events.", mark: "", tone: "coral", icon: "/beacon-coral-sun.svg" },
  { id: "files", name: "MARS File Space", category: "FILE SPACE", description: "Access reports, files, and shared documents.", mark: "▤", tone: "violet" },
];

function AppCard({ app, favorite, onToggle }: { app: typeof applications[number]; favorite: boolean; onToggle: () => void }) {
  return <article className="app-card">
    <button className="favorite-button" type="button" aria-label={`${favorite ? "Remove" : "Add"} ${app.name} ${favorite ? "from" : "to"} favorites`} aria-pressed={favorite} onClick={onToggle}>{favorite ? "★" : "☆"}</button>
    <div className={`app-mark logo-preview ${app.id === "beacon" ? "beacon-mark" : "generated-mark"}`}><img src={app.icon ?? `/mars-${app.id}-logo.png`} alt="" /></div>
    <div className="app-card-copy">
      <h3>{app.name}</h3>
      <p>{app.description}</p>
    </div>
  </article>;
}

function Launchpad({ appearance, onAppearanceChange, onSignOut }: { appearance: "light" | "night"; onAppearanceChange: () => void; onSignOut: () => void }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const favoriteApps = applications.filter((app) => favorites.includes(app.id));
  const toggleFavorite = (id: string) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  return <main className={`launchpad theme-${appearance}`}>
    <div className="launchpad-shade" aria-hidden="true" />
    <header className="launchpad-header">
      <div className="launchpad-identity"><Brand inverse /><span>COMMAND DECK</span></div>
      <div className="launchpad-welcome"><small>Welcome back</small><strong>jinbailiu@maybank.com</strong></div>
      <div className="launchpad-actions"><button type="button">⌖ SG · Singapore</button><button type="button" onClick={onAppearanceChange}>{appearance === "night" ? "☾ Night" : "☼ Light"}</button><button type="button" onClick={onSignOut}>Sign out</button></div>
    </header>
    <div className="launchpad-content">
      {favoriteApps.length ? <section className="app-section favorites-section">
        <div className="section-heading"><span>★</span><h2>Your favorites</h2><b>{favoriteApps.length} apps</b></div>
        <div className="app-grid favorite-grid">{favoriteApps.map((app) => <AppCard key={app.id} app={app} favorite onToggle={() => toggleFavorite(app.id)} />)}</div>
      </section> : <div className="favorites-hint"><span>☆</span><p><strong>Build your shortcuts.</strong> Star any workspace to keep it here.</p></div>}
      <section className="app-section all-workspaces">
        <div className="section-heading"><span>⌘</span><h2>All workspaces</h2><b>{applications.length} apps</b></div>
        <div className="app-grid">{applications.map((app) => <AppCard key={app.id} app={app} favorite={favorites.includes(app.id)} onToggle={() => toggleFavorite(app.id)} />)}</div>
      </section>
    </div>
    <footer className="launchpad-footer">MARS PLATFORM · INTERNAL USE ONLY · MODERN FINANCIAL FRONT OFFICE SYSTEM</footer>
  </main>;
}

function LoginForm({ glass = false, onSuccess, success = false }: { glass?: boolean; onSuccess?: () => void; success?: boolean }) {
  const [method, setMethod] = useState<"email" | "magic">("email");
  return (
    <div className={`login-card ${glass ? "glass-card" : ""} ${success ? "is-success" : ""}`}>
      <h2>Welcome back</h2>
      <p className="intro">Sign in to your MARS account to continue</p>
      <div className="region-badge"><span /> REGION: SINGAPORE</div>
      <div className="login-method" role="tablist" aria-label="Sign-in method">
        <button type="button" role="tab" aria-selected={method === "email"} className={method === "email" ? "active" : ""} onClick={() => setMethod("email")}>Email</button>
        <button type="button" role="tab" aria-selected={method === "magic"} className={method === "magic" ? "active" : ""} onClick={() => setMethod("magic")}>Magic Link</button>
      </div>
      <form onSubmit={(event) => { event.preventDefault(); onSuccess?.(); }}>
        <label htmlFor={glass ? "glass-email" : "email"}>EMAIL</label>
        <div className="field-wrap"><span aria-hidden="true">✉</span><input id={glass ? "glass-email" : "email"} type="email" placeholder="you@company.com" autoComplete="email" /></div>
        {method === "email" && <><label htmlFor={glass ? "glass-password" : "password"}>PASSWORD</label><div className="field-wrap"><span aria-hidden="true">⌑</span><input id={glass ? "glass-password" : "password"} type="password" placeholder="Enter your password" autoComplete="current-password" /><span className="field-end" aria-hidden="true">◉</span></div></>}
        <button className="sign-in" type="submit" disabled={success}>{success ? "ACCESS GRANTED" : method === "email" ? "Sign In" : "Send Magic Link"} <span>{success ? "✓" : "→"}</span></button>
      </form>
      <div className="secure-access"><span /> SECURE ACCESS</div>
      <p className="create-account">Protected by MARS Identity · © 2026 Front Office Platform</p>
    </div>
  );
}

function IndustrialConcept() {
  const [appearance, setAppearance] = useState<"light" | "night">("light");
  const [authStage, setAuthStage] = useState<"idle" | "launching" | "launchpad">("idle");
  const isNight = appearance === "night";
  useEffect(() => {
    if (authStage !== "launching") return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setAuthStage("launchpad"), reducedMotion ? 250 : 2100);
    return () => window.clearTimeout(timer);
  }, [authStage]);
  useEffect(() => {
    if (authStage !== "launching") return;
    const skip = (event: KeyboardEvent) => {
      if (["Escape", "Enter", " "].includes(event.key)) setAuthStage("launchpad");
    };
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [authStage]);
  if (authStage === "launchpad") return <Launchpad appearance={appearance} onAppearanceChange={() => setAppearance(isNight ? "light" : "night")} onSignOut={() => setAuthStage("idle")} />;
  return (
    <main className={`login-shell industrial-concept theme-${appearance} ${authStage !== "idle" ? "auth-running" : ""}`}>
      <section className="launch-scene" aria-label="Industrial illustrated launch and landing sequence">
        <img className="tower-asset" src="/mars-launch-assembly-trimmed.webp" alt="" aria-hidden="true" />
        <RocketSequence />
      </section>
      <section className="login-panel">
        <header className="panel-header">
          <div className="panel-brand"><Brand /></div>
          <div className="panel-tools"><button type="button">⌖ SG · Singapore</button><button type="button" aria-label={`Switch to ${isNight ? "light" : "night"} appearance`} aria-pressed={isNight} onClick={() => setAppearance(isNight ? "light" : "night")}>{isNight ? "☾ Night" : "☼ Light"}</button></div>
        </header>
        <LoginForm success={authStage !== "idle"} onSuccess={() => authStage === "idle" && setAuthStage("launching")} />
      </section>
      {authStage === "launching" && <section className="auth-transition launching" aria-live="polite" aria-label="Login successful, launch authorized">
        <div className="auth-shade" />
        <div className="auth-sequence-copy">
          <span>IDENTITY VERIFIED</span>
          <strong>Launch authorized</strong>
          <div><i /> SECURE CHANNEL <i /> PORTFOLIO SYSTEMS <i /> MISSION READY</div>
        </div>
        <div className="success-rig" aria-hidden="true">
          <img className="success-tower" src="/mars-launch-assembly-trimmed.webp" alt="" />
          <div className="success-rocket"><img src="/mars-industrial-booster-pointed.webp" alt="" /><b /><em /></div>
        </div>
        <button className="skip-transition" type="button" onClick={() => setAuthStage("launchpad")}>Skip animation →</button>
      </section>}
    </main>
  );
}

function CinematicConcept() {
  return (
    <main className="cinematic-concept">
      <div className="cinematic-bg" aria-hidden="true" />
      <div className="cinematic-shade" aria-hidden="true" />
      <header className="cinematic-header"><Brand inverse /><span>INSTITUTIONAL PLATFORM / SECURE</span></header>
      <section className="cinematic-copy"><p>MISSION-GRADE FINANCIAL INFRASTRUCTURE</p><h1>Navigate capital.<br />Command the future.</h1><span>Global portfolio intelligence for institutional decision-makers.</span></section>
      <div className="cinematic-animation"><RocketSequence /></div>
      <aside className="glass-login"><LoginForm glass /></aside>
      <div className="cinematic-status"><span /> LIVE SYSTEMS <b>GLOBAL / 24:7</b></div>
    </main>
  );
}

export default function Home() {
  return <IndustrialConcept />;
}
