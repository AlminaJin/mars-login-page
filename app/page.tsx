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
  const [authStage, setAuthStage] = useState<"idle" | "launching" | "complete">("idle");
  const isNight = appearance === "night";
  useEffect(() => {
    if (authStage !== "launching") return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setAuthStage("complete"), reducedMotion ? 250 : 3400);
    return () => window.clearTimeout(timer);
  }, [authStage]);
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
      {authStage !== "idle" && <section className={`auth-transition ${authStage}`} aria-live="polite" aria-label="Login successful, launch authorized">
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
        <div className="success-complete">
          <div className="welcome-brand" aria-label="MARS">
            <img src="/mars-logo.svg" alt="MARS rocket logo" />
            <span>MARS</span>
          </div>
          <p>Authentication complete</p>
          <h2>Welcome to MARS</h2>
          <button type="button" onClick={() => setAuthStage("idle")}>Replay transition</button>
        </div>
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
