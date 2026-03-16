"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const MARQUEE_ITEMS = [
  "Brand Strategy",
  "Visual Identity",
  "Motion Design",
  "Digital Experience",
  "Art Direction",
  "Brand Systems",
  "Brand Strategy",
  "Visual Identity",
  "Motion Design",
  "Digital Experience",
  "Art Direction",
  "Brand Systems",
];

const STATS = [
  { value: "140+", label: "Brands Built" },
  { value: "12", label: "Years of Craft" },
  { value: "3×", label: "Awwwards SOTD" },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);
  const morphRef = useRef<SVGPathElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);

  /* ── Master GSAP timeline ── */
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Split headline text
      const split = new SplitText(headlineRef.current, {
        type: "lines,words,chars",
        linesClass: "split-line",
      });

      gsap.set(split.chars, { yPercent: 110, opacity: 0 });

      // 2. Master timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Eyebrow
      tl.fromTo(
        eyebrowRef.current,
        { xPercent: -20, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.8 },
        0
      );

      // Headline chars cascade
      tl.to(
        split.chars,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: { amount: 0.55, from: "start" },
          ease: "power3.out",
        },
        0.15
      );

      // Decorative line grows
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "expo.out", transformOrigin: "left center" },
        0.3
      );

      // Circle morphs in
      tl.fromTo(
        circleRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.6)" },
        0.5
      );

      // Sub paragraph
      tl.fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        0.7
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.85
      );

      // Stats stagger
      const statItems = statsRef.current?.querySelectorAll(".stat-item");
      if (statItems && statItems.length > 0) {
        tl.fromTo(
          statItems,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
          0.9
        );
      }

      // Floating tags
      tagRefs.current.forEach((tag, i) => {
        if (!tag) return;
        tl.fromTo(
          tag,
          { scale: 0.7, opacity: 0, rotation: -8 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.9, ease: "back.out(1.4)" },
          0.9 + i * 0.12
        );
      });

      // SVG morph path — continuous breath animation
      if (morphRef.current) {
        gsap.to(morphRef.current, {
          attr: {
            d: "M 0 200 Q 250 80 500 200 Q 750 320 1000 200 L 1000 400 L 0 400 Z",
          },
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Marquee continuous scroll
      if (marqueeRef.current) {
        const trackWidth = marqueeRef.current.scrollWidth / 2;
        gsap.to(marqueeRef.current, {
          x: -trackWidth,
          duration: 30,
          repeat: -1,
          ease: "none",
        });
      }

      // Floating circle pulse
      gsap.to(circleRef.current, {
        scale: 1.05,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });

      // ScrollTrigger: headline scrubs on scroll
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(headlineRef.current, {
            y: self.progress * 120,
            opacity: 1 - self.progress * 1.2,
            duration: 0,
          });
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* ── Custom cursor ── */
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0,
      mouseY = 0;
    let curX = 0,
      curY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const loop = () => {
      curX += (mouseX - curX) * 0.1;
      curY += (mouseY - curY) * 0.1;
      cursor.style.transform = `translate(${curX - 16}px, ${curY - 16}px)`;
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const onEnterCTA = () => {
    gsap.to(cursorRef.current, { scale: 3, duration: 0.35, ease: "power2.out" });
    if (cursorTextRef.current) cursorTextRef.current.style.opacity = "1";
  };

  const onLeaveCTA = () => {
    gsap.to(cursorRef.current, { scale: 1, duration: 0.35, ease: "power2.out" });
    if (cursorTextRef.current) cursorTextRef.current.style.opacity = "0";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Outfit:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        * { cursor: none !important; }

        :root {
          --cream: #faf8f5;
          --warm-white: #f5f2ed;
          --gold: #b8924a;
          --gold-light: #d4aa6a;
          --ink: #1a1714;
          --ink-soft: #3d3630;
          --muted: #9b9189;
          --border: rgba(26,23,20,0.1);
        }

        .hero-section {
          background: var(--cream);
          color: var(--ink);
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }

        /* cursor */
        .cursor {
          position: fixed;
          top: 0; left: 0;
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 1.5px solid var(--gold);
          pointer-events: none;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform;
          background: rgba(184,146,74,0.06);
        }
        .cursor-text {
          font-size: 0.42rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
          opacity: 0;
          transition: opacity 0.2s;
          white-space: nowrap;
        }

        /* subtle dot grid */
        .dot-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image: radial-gradient(circle, rgba(26,23,20,0.06) 1px, transparent 1px);
          background-size: 36px 36px;
        }

        /* wavy SVG bottom */
        .wave-svg {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 1;
          pointer-events: none;
        }

        /* Decorative circle */
        .deco-circle {
          position: absolute;
          right: 6%;
          top: 12%;
          width: clamp(240px, 30vw, 480px);
          height: clamp(240px, 30vw, 480px);
          border-radius: 50%;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }
        .deco-circle::before {
          content: '';
          position: absolute;
          inset: 16px;
          border-radius: 50%;
          border: 1px dashed rgba(184,146,74,0.25);
        }
        .deco-circle-inner {
          width: 55%;
          height: 55%;
          border-radius: 50%;
          background: linear-gradient(135deg, #f0e6d3 0%, #e8dbc8 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 4px;
          box-shadow: 0 12px 48px rgba(184,146,74,0.15), 0 2px 8px rgba(0,0,0,0.06);
        }
        .deco-circle-inner span:first-child {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 3vw, 2.8rem);
          font-weight: 400;
          font-style: italic;
          color: var(--gold);
          line-height: 1;
        }
        .deco-circle-inner span:last-child {
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* Eyebrow */
        .eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 500;
        }
        .eyebrow-line {
          height: 1px;
          width: 40px;
          background: var(--gold);
          display: block;
        }

        /* Headline */
        .headline {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: clamp(3.5rem, 9.5vw, 9.5rem);
          line-height: 0.9;
          letter-spacing: -0.03em;
          color: var(--ink);
          overflow: hidden;
        }
        .headline em {
          font-style: italic;
          color: var(--gold);
        }
        .split-line {
          overflow: hidden;
          display: block;
        }

        /* Sub */
        .sub-text {
          font-size: clamp(0.9rem, 1.4vw, 1.05rem);
          font-weight: 300;
          line-height: 1.8;
          color: var(--muted);
          max-width: 380px;
        }

        /* CTA primary */
        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--ink);
          color: var(--cream);
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 14px 30px;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: color 0.4s;
        }
        .cta-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gold);
          transform: translateY(101%);
          transition: transform 0.45s cubic-bezier(0.4,0,0.2,1);
        }
        .cta-primary:hover::after { transform: translateY(0); }
        .cta-primary span, .cta-primary svg { position: relative; z-index: 1; }
        .cta-primary svg { transition: transform 0.3s; }
        .cta-primary:hover svg { transform: translateX(4px); }

        /* CTA ghost */
        .cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink-soft);
          text-decoration: none;
          border-bottom: 1px solid var(--border);
          padding-bottom: 3px;
          transition: color 0.3s, border-color 0.3s;
        }
        .cta-ghost:hover { color: var(--gold); border-color: var(--gold); }

        /* Stats */
        .stat-value {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 700;
          color: var(--ink);
          line-height: 1;
        }
        .stat-label {
          font-size: 0.63rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--muted);
          margin-top: 5px;
        }
        .stat-divider {
          width: 1px;
          height: 40px;
          background: var(--border);
          align-self: center;
        }

        /* Floating tags */
        .float-tag {
          position: absolute;
          background: #fff;
          border: 1px solid var(--border);
          padding: 8px 14px;
          font-size: 0.62rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink-soft);
          white-space: nowrap;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          z-index: 3;
        }
        .float-tag-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold);
          margin-right: 6px;
          vertical-align: middle;
        }

        /* Marquee */
        .marquee-wrapper {
          overflow: hidden;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: #fff;
          z-index: 5;
          position: relative;
        }
        .marquee-track {
          display: flex;
          align-items: center;
          will-change: transform;
          white-space: nowrap;
          padding: 16px 0;
        }
        .marquee-item {
          flex-shrink: 0;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          padding: 0 4px;
        }
        .marquee-sep {
          color: var(--gold);
          margin: 0 24px;
          font-size: 0.45rem;
          flex-shrink: 0;
        }

        /* decorative horizontal line */
        .deco-line {
          height: 1px;
          background: linear-gradient(to right, transparent, var(--gold-light), transparent);
          transform-origin: left center;
        }

        /* Bottom bar */
        .bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 5% 20px;
          position: relative;
          z-index: 5;
          border-top: 1px solid var(--border);
          background: var(--cream);
        }
        .social-link {
          font-size: 0.62rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.25s;
        }
        .social-link:hover { color: var(--gold); }

        /* animated underline on headline word */
        .headline-underline {
          position: relative;
          display: inline-block;
        }
        .headline-underline::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0;
          height: 3px;
          width: 100%;
          background: var(--gold-light);
          opacity: 0.45;
          border-radius: 2px;
        }

        /* availability dot */
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .avail-dot {
          display: inline-block;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #4caf7d;
          animation: blink 2.4s ease infinite;
          margin-right: 7px;
          vertical-align: middle;
        }
      `}</style>

      {/* Custom cursor */}
      <div ref={cursorRef} className="cursor">
        <span ref={cursorTextRef} className="cursor-text">View</span>
      </div>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="hero-section">

        {/* Dot grid bg */}
        <div className="dot-grid" />

        {/* Wave SVG — animated breath */}
        <svg className="wave-svg" viewBox="0 0 1000 160" preserveAspectRatio="none" style={{ height: 120 }}>
          <path
            ref={morphRef}
            d="M 0 200 Q 250 120 500 200 Q 750 280 1000 200 L 1000 400 L 0 400 Z"
            fill="#f0e9de"
            opacity="0.6"
          />
        </svg>

        {/* Decorative circle (right side) */}
        <div ref={circleRef} className="deco-circle">
          <div className="deco-circle-inner">
            <span>F·S</span>
            <span>Studio</span>
          </div>
        </div>

        {/* Floating tags */}
        <div
          ref={(el) => { tagRefs.current[0] = el; }}
          className="float-tag"
          style={{ top: "28%", right: "28%" }}
        >
          <span className="float-tag-dot" />Nike Rebrand '24
        </div>
        <div
          ref={(el) => { tagRefs.current[1] = el; }}
          className="float-tag"
          style={{ top: "52%", right: "14%" }}
        >
          <span className="float-tag-dot" />Tesla Campaign
        </div>
        <div
          ref={(el) => { tagRefs.current[2] = el; }}
          className="float-tag"
          style={{ top: "68%", right: "32%" }}
        >
          <span className="float-tag-dot" />Adidas Identity
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 5%", paddingTop: "clamp(100px, 14vh, 160px)", position: "relative", zIndex: 4 }}>

          {/* Top bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(28px, 4vh, 48px)" }}>
            <div ref={eyebrowRef} className="eyebrow">
              <span className="eyebrow-line" />
              World-Class Branding Studio
            </div>
            <div style={{ display: "flex", alignItems: "center", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
              <span className="avail-dot" />
              Available 2025
            </div>
          </div>

          {/* Headline */}
          <h1 ref={headlineRef} className="headline" style={{ maxWidth: "75vw" }}>
            We shape<br />
            brands that<br />
            <em className="headline-underline">define</em> culture.
          </h1>

          {/* Decorative line */}
          <div
            ref={lineRef}
            className="deco-line"
            style={{ width: "100%", maxWidth: 480, marginTop: "clamp(20px, 3vh, 36px)", marginBottom: "clamp(20px, 3vh, 36px)" }}
          />

          {/* Bottom layout */}
          <div style={{ display: "flex", gap: "clamp(32px, 5vw, 80px)", alignItems: "flex-end", flexWrap: "wrap", paddingBottom: "clamp(28px, 4vh, 48px)" }}>

            {/* Left: sub + CTAs */}
            <div style={{ flex: "1 1 320px", maxWidth: 420 }}>
              <p ref={subRef} className="sub-text">
                From challenger startups to Fortune 500 giants — we craft identities that don't just look good, they make people feel something irreplaceable.
              </p>
              <div ref={ctaRef} style={{ display: "flex", alignItems: "center", gap: 20, marginTop: "clamp(24px, 3vh, 36px)", flexWrap: "wrap" }}>
                <a
                  href="#work"
                  className="cta-primary"
                  onMouseEnter={onEnterCTA}
                  onMouseLeave={onLeaveCTA}
                >
                  <span>See Our Work</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7H13M7 1L13 7L7 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="#studio" className="cta-ghost">
                  <span>Our Studio</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: Stats */}
            <div ref={statsRef} style={{ display: "flex", alignItems: "flex-start", gap: "clamp(16px, 3vw, 40px)", flexWrap: "wrap" }}>
              {STATS.map((stat, i) => (
                <>
                  <div key={stat.label} className="stat-item">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                  {i < STATS.length - 1 && (
                    <div key={`div-${i}`} className="stat-divider" />
                  )}
                </>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="marquee-wrapper">
          <div ref={marqueeRef} className="marquee-track">
            {MARQUEE_ITEMS.map((item, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                <span className="marquee-item">{item}</span>
                <span className="marquee-sep">◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bottom-bar">
          <div style={{ display: "flex", gap: 20 }}>
            {["Instagram", "Behance", "Dribbble"].map((s) => (
              <a key={s} href="#" className="social-link">{s}</a>
            ))}
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.85rem", color: "var(--muted)" }}>
            Est. 2013
          </div>
          <div style={{ fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>
            hello@formestudio.co
          </div>
        </div>
      </section>
    </>
  );
}