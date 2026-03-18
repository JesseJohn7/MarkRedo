"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const SUBSIDIARIES = [
  { label: "Mark Films",            href: "#markfilms" },
  { label: "Mark Studio",           href: "#markstudio" },
  { label: "Mark TV",               href: "#marktv" },
  { label: "Mark Wash",             href: "#markwash" },
  { label: "Mark Joel's",           href: "#markjoels" },
  { label: "Swift Trading Academy", href: "#swift" },
];

const ABOUT_LINKS = [
  { label: "Our Story", href: "/about" },
  { label: "Our Team",  href: "/team" },
  { label: "Gallery",   href: "/gallery" },
];

export default function Navbar() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [aboutOpen,   setAboutOpen]   = useState(false);
  const [subsOpen,    setSubsOpen]    = useState(false);
  const [mobileAbout, setMobileAbout] = useState(false);
  const [mobileSubs,  setMobileSubs]  = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const subsRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) setAboutOpen(false);
      if (subsRef.current  && !subsRef.current.contains(e.target as Node))  setSubsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700&family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');

        /* ─── CSS Variables ─── */
        :root {
          --accent:      #c9a96e;
          --accent-dark: #a8834a;
          --text:        #1a1a1a;
          --muted:       #6b6b6b;
          --light:       #f0f0ee;
          --white:       #ffffff;
          --border:      #e4e0db;
          --shadow:      rgba(0,0,0,0.08);
        }

        /* ─── Base ─── */
        .nav-root {
          font-family: 'Nunito Sans', sans-serif;
          background: var(--white);
          color: var(--text);
        }

        /* ─── Logo ─── */
        .logo-img {
          height: 68px;
          width: auto;
          object-fit: contain;
          transition: transform 0.35s ease, height 0.35s ease;
          display: block;
        }
        .logo-link:hover .logo-img { transform: scale(1.03); }
        .nav-root.is-scrolled .logo-img { height: 54px; }

        /* ─── Desktop nav link ─── */
        .nav-link {
          position: relative;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text);
          text-decoration: none;
          padding: 8px 2px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Nunito Sans', sans-serif;
          white-space: nowrap;
          transition: color 0.25s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 0;
          width: 0; height: 2px;
          background: var(--accent);
          border-radius: 2px;
          transition: width 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-link:hover,
        .nav-link.is-open { color: var(--accent); }
        .nav-link:hover::after,
        .nav-link.is-open::after { width: 100%; }

        /* chevron */
        .chev {
          display: inline-block;
          width: 6px; height: 6px;
          border-right: 1.5px solid currentColor;
          border-bottom: 1.5px solid currentColor;
          transform: rotate(45deg) translateY(-2px);
          transition: transform 0.28s ease;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .chev.up { transform: rotate(-135deg) translateY(2px); }

        /* ─── Dropdown ─── */
        .drop-panel {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%) translateY(6px);
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 6px 0;
          min-width: 200px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.4,0,0.2,1);
          z-index: 200;
          box-shadow: 0 8px 32px var(--shadow), 0 2px 8px rgba(0,0,0,0.06);
        }
        .drop-panel.is-visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }
        /* gold accent top border */
        .drop-panel::before {
          content: '';
          position: absolute;
          top: -1px; left: 24px; right: 24px;
          height: 2px;
          background: var(--accent);
          border-radius: 2px 2px 0 0;
        }

        .drop-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .drop-item:hover {
          color: var(--accent);
          background: #faf8f5;
        }
        .drop-item .dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0;
          flex-shrink: 0;
          transition: opacity 0.2s;
        }
        .drop-item:hover .dot { opacity: 1; }

        .drop-divider {
          height: 1px;
          background: var(--border);
          margin: 4px 14px;
        }

        /* ─── Shop Now button — solid rectangle ─── */
        .shop-btn {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 10px 18px;
          background: var(--accent);
          color: #ffffff;
          border: 2px solid var(--accent);
          border-radius: 4px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.28s ease, color 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
          box-shadow: 0 2px 10px rgba(201,169,110,0.22);
        }
        .shop-btn:hover {
          background: var(--accent-dark);
          border-color: var(--accent-dark);
          box-shadow: 0 4px 18px rgba(201,169,110,0.38);
          color: #ffffff;
        }

        /* ─── Scrolled state ─── */
        .nav-root.is-scrolled {
          box-shadow: 0 2px 20px var(--shadow);
        }

        /* ─── Mobile overlay — LIGHT ─── */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: var(--white);
          z-index: 40;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.5s cubic-bezier(0.77,0,0.175,1);
          overflow-y: auto;
        }
        .mobile-overlay.is-open { transform: translateX(0); }

        /* mobile nav item */
        .m-nav-item {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.7rem, 6vw, 2.6rem);
          font-weight: 300;
          font-style: italic;
          color: var(--text);
          text-decoration: none;
          letter-spacing: 0.02em;
          line-height: 1.2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 0;
          border-bottom: 1px solid var(--border);
          cursor: pointer;
          background: none;
          border-left: none; border-right: none; border-top: none;
          width: 100%;
          text-align: left;
          transition: color 0.25s;
        }
        .m-nav-item:hover { color: var(--accent); }
        .m-nav-item:first-child { border-top: 1px solid var(--border); margin-top: 6px; }

        .m-sub-list {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.42s cubic-bezier(0.4,0,0.2,1);
        }
        .m-sub-list.is-open { max-height: 600px; }

        .m-sub-item {
          display: block;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          padding: 11px 0 11px 20px;
          border-bottom: 1px solid #f0ece8;
          transition: color 0.2s, padding-left 0.2s;
        }
        .m-sub-item:hover { color: var(--accent); padding-left: 28px; }

        /* hamburger */
        .h-line {
          display: block;
          height: 2px;
          background: var(--text);
          border-radius: 2px;
          transition: transform 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.22s ease, width 0.3s ease;
          transform-origin: center;
        }
      `}</style>

      {/* ══════════════ HEADER ══════════════ */}
      <header
        className={`nav-root fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
          scrolled ? "is-scrolled" : ""
        }`}
      >
        {/* ── inner wrapper: Logo | Nav (centred) | Shop ── */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-[88px] lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-4">

            {/* 1. Logo — left */}
            <a href="/" className="logo-link shrink-0 flex items-center" aria-label="Home">
              <Image
                src="/logo.png"
                alt="Logo"
                width={180}
                height={52}
                priority
                className="logo-img"
              />
            </a>

            {/* 2. Nav links — centred in the middle column */}
            <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8">

              <a href="/" className="nav-link">Home</a>

              {/* About dropdown */}
              <div className="relative" ref={aboutRef}>
                <button
                  className={`nav-link ${aboutOpen ? "is-open" : ""}`}
                  onClick={() => { setAboutOpen(p => !p); setSubsOpen(false); }}
                >
                  About
                  <span className={`chev ${aboutOpen ? "up" : ""}`} />
                </button>
                <div className={`drop-panel ${aboutOpen ? "is-visible" : ""}`}>
                  {ABOUT_LINKS.map(item => (
                    <a key={item.label} href={item.href} className="drop-item"
                       onClick={() => setAboutOpen(false)}>
                      <span className="dot" />
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <a href="#services" className="nav-link">Our Services</a>

              {/* Subsidiaries dropdown */}
              <div className="relative" ref={subsRef}>
                <button
                  className={`nav-link ${subsOpen ? "is-open" : ""}`}
                  onClick={() => { setSubsOpen(p => !p); setAboutOpen(false); }}
                >
                  Our Subsidiaries
                  <span className={`chev ${subsOpen ? "up" : ""}`} />
                </button>
                <div className={`drop-panel ${subsOpen ? "is-visible" : ""}`} style={{ minWidth: 230 }}>
                  {SUBSIDIARIES.map((item, i) => (
                    <div key={item.label}>
                      <a href={item.href} className="drop-item"
                         onClick={() => setSubsOpen(false)}>
                        <span className="dot" />
                        {item.label}
                      </a>
                      {i === 2 && <div className="drop-divider" />}
                    </div>
                  ))}
                </div>
              </div>
            </nav>

            {/* 3. Shop Now — right */}
            

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col justify-center items-center gap-[6px] w-9 h-9 relative z-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="h-line w-6" style={{
                transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none",
                background: menuOpen ? "var(--accent)" : "var(--text)",
              }} />
              <span className="h-line w-4" style={{ opacity: menuOpen ? 0 : 1 }} />
              <span className="h-line" style={{
                width: menuOpen ? "24px" : "20px",
                transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
                background: menuOpen ? "var(--accent)" : "var(--text)",
              }} />
            </button>

          </div>
        </div>

        {/* bottom border line */}
        <div className="h-px bg-[var(--border)]" />
      </header>

      {/* ══════════════ MOBILE MENU ══════════════ */}
      <div className={`mobile-overlay ${menuOpen ? "is-open" : ""}`}>

        {/* top bar */}
        <div className="flex items-center justify-between px-5 h-[88px] border-b border-[var(--border)] shrink-0">
          <a href="/" className="logo-link" onClick={() => setMenuOpen(false)} aria-label="Home">
            <Image src="/logo.png" alt="Logo" width={160} height={44}
              className="logo-img" style={{ height: "44px" }} />
          </a>
          {/* close X */}
          <button
            className="flex flex-col justify-center items-center gap-[6px] w-9 h-9"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <span className="h-line w-6" style={{
              transform: "translateY(8px) rotate(45deg)",
              background: "var(--accent)",
            }} />
            <span className="h-line w-6" style={{
              transform: "translateY(-0px) rotate(-45deg)",
              background: "var(--accent)",
            }} />
          </button>
        </div>

        {/* nav links */}
        <nav className="flex flex-col px-6 pt-2 pb-6 flex-1">

          <a href="/" className="m-nav-item" onClick={() => setMenuOpen(false)}>Home</a>

          <button className="m-nav-item" onClick={() => setMobileAbout(p => !p)}>
            About
            <span className={`chev ${mobileAbout ? "up" : ""}`}
              style={{ color: "var(--accent)", marginRight: 4 }} />
          </button>
          <div className={`m-sub-list ${mobileAbout ? "is-open" : ""}`}>
            {ABOUT_LINKS.map(item => (
              <a key={item.label} href={item.href} className="m-sub-item"
                 onClick={() => {setMenuOpen(false); setMobileAbout(false);}}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a href="#services" className="m-nav-item" onClick={() => setMenuOpen(false)}>
            Our Services
          </a>

          <button className="m-nav-item" onClick={() => setMobileSubs(p => !p)}>
            Our Subsidiaries
            <span className={`chev ${mobileSubs ? "up" : ""}`}
              style={{ color: "var(--accent)", marginRight: 4 }} />
          </button>
          <div className={`m-sub-list ${mobileSubs ? "is-open" : ""}`}>
            {SUBSIDIARIES.map(item => (
              <a key={item.label} href={item.href} className="m-sub-item"
                 onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>

        </nav>

        {/* bottom CTA */}
        <div className="px-6 pb-10 shrink-0">
         
        </div>
      </div>
    </>
  );
}