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
  { label: "Our Story", href: "#our-story" },
  { label: "Our Team",  href: "#our-team" },
  { label: "Gallery",   href: "#gallery" },
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
    const onScroll = () => setScrolled(window.scrollY > 20);
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --gold:   #c9a96e;
          --gold2:  #e8c98a;
          --dark:   #0a0a0a;
          --ink:    #f5f0e8;
          --muted:  #9e9690;
          --border: rgba(255,255,255,0.08);
        }

        .nav-root { font-family: 'DM Sans', sans-serif; }

        /* ── Logo ── */
        .logo-img {
          height: 54px;
          width: auto;
          object-fit: contain;
          filter: brightness(1.15) drop-shadow(0 0 12px rgba(201,169,110,0.3));
          transition: filter 0.4s ease, transform 0.4s ease, height 0.4s ease;
        }
        .logo-link:hover .logo-img {
          filter: brightness(1.3) drop-shadow(0 0 22px rgba(201,169,110,0.55));
          transform: scale(1.04);
        }
        .scrolled .logo-img { height: 44px; }

        /* ── Desktop nav link ── */
        .nav-link {
          position: relative;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          padding: 6px 0;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.3s;
          white-space: nowrap;
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: var(--gold);
          transition: width 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-link:hover, .nav-link.open { color: var(--ink); }
        .nav-link:hover::after, .nav-link.open::after { width: 100%; }

        /* chevron icon */
        .chev {
          display: inline-block;
          width: 7px; height: 7px;
          border-right: 1.5px solid currentColor;
          border-bottom: 1.5px solid currentColor;
          transform: rotate(45deg) translateY(-2px);
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }
        .chev.up { transform: rotate(-135deg) translateY(2px); }

        /* ── Dropdown panel ── */
        .drop-panel {
          position: absolute;
          top: calc(100% + 16px);
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: rgba(10,10,10,0.97);
          border: 1px solid var(--border);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-radius: 3px;
          padding: 6px 0;
          min-width: 210px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.4,0,0.2,1);
          z-index: 100;
          box-shadow: 0 28px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,169,110,0.07), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .drop-panel.visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }
        /* gold top accent line */
        .drop-panel::before {
          content: '';
          position: absolute;
          top: -1px; left: 20%; right: 20%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }

        .drop-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 20px;
          font-size: 0.75rem;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s, background 0.2s, padding-left 0.2s;
          white-space: nowrap;
        }
        .drop-item:hover {
          color: var(--gold);
          background: rgba(201,169,110,0.05);
          padding-left: 26px;
        }
        .drop-item .dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--gold);
          opacity: 0;
          transition: opacity 0.2s;
          flex-shrink: 0;
        }
        .drop-item:hover .dot { opacity: 1; }

        .drop-divider {
          height: 1px;
          background: var(--border);
          margin: 4px 16px;
        }

        /* ── SHOP button — bold & visible ── */
        .shop-btn {
          position: relative;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 12px 32px;
          border: none;
          background: var(--gold);
          color: #050505;
          cursor: pointer;
          overflow: hidden;
          transition: color 0.35s ease, box-shadow 0.35s ease;
          box-shadow: 0 0 0 0 rgba(201,169,110,0.4);
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
        }
        .shop-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--gold2), var(--gold));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .shop-btn:hover {
          box-shadow: 0 0 30px rgba(201,169,110,0.45);
        }
        .shop-btn:hover::before { transform: scaleX(1); }
        .shop-btn span { position: relative; z-index: 1; }

        .nav-backdrop {
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        /* ── Mobile overlay ── */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: var(--dark);
          z-index: 40;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.55s cubic-bezier(0.77,0,0.175,1);
          overflow-y: auto;
        }
        .mobile-overlay.open { transform: translateX(0); }

        .grain-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }

        /* mobile items */
        .m-nav-item {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.7rem, 5.5vw, 2.8rem);
          font-weight: 300;
          font-style: italic;
          color: var(--ink);
          text-decoration: none;
          letter-spacing: 0.02em;
          line-height: 1.2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          border-bottom: 1px solid var(--border);
          cursor: pointer;
          background: none;
          border-left: none; border-right: none; border-top: none;
          width: 100%;
          text-align: left;
          transition: color 0.3s;
        }
        .m-nav-item:hover { color: var(--gold); }
        .m-nav-item:first-child { border-top: 1px solid var(--border); margin-top: 8px; }

        .m-sub-list {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.45s cubic-bezier(0.4,0,0.2,1);
        }
        .m-sub-list.open { max-height: 700px; }

        .m-sub-item {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          padding: 11px 0 11px 18px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: color 0.2s, padding-left 0.2s;
        }
        .m-sub-item:hover { color: var(--gold); padding-left: 26px; }

        .hamburger-line {
          display: block;
          height: 1px;
          background: currentColor;
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease;
          transform-origin: center;
        }
      `}</style>

      {/* ─── Main Navbar ─── */}
      <header
        className={`nav-root fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "scrolled nav-backdrop bg-[#0a0a0a]/93 border-b border-white/[0.07]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-[84px]">

            {/* ── Logo ── */}
            <a href="/" className="logo-link flex items-center select-none shrink-0" aria-label="Home">
              <Image
                src="/logo.png"
                alt="Logo"
                width={190}
                height={54}
                priority
                className="logo-img"
              />
            </a>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">

              {/* Home */}
              <a href="/" className="nav-link">Home</a>

              {/* About */}
              <div className="relative" ref={aboutRef}>
                <button
                  className={`nav-link ${aboutOpen ? "open" : ""}`}
                  onClick={() => { setAboutOpen(p => !p); setSubsOpen(false); }}
                >
                  About
                  <span className={`chev ${aboutOpen ? "up" : ""}`} />
                </button>
                <div className={`drop-panel ${aboutOpen ? "visible" : ""}`}>
                  {ABOUT_LINKS.map(item => (
                    <a key={item.label} href={item.href} className="drop-item" onClick={() => setAboutOpen(false)}>
                      <span className="dot" />
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Our Services */}
              <a href="#services" className="nav-link">Our Services</a>

              {/* Our Subsidiaries */}
              <div className="relative" ref={subsRef}>
                <button
                  className={`nav-link ${subsOpen ? "open" : ""}`}
                  onClick={() => { setSubsOpen(p => !p); setAboutOpen(false); }}
                >
                  Our Subsidiaries
                  <span className={`chev ${subsOpen ? "up" : ""}`} />
                </button>
                <div className={`drop-panel ${subsOpen ? "visible" : ""}`} style={{ minWidth: 230 }}>
                  {SUBSIDIARIES.map((item, i) => (
                    <div key={item.label}>
                      <a href={item.href} className="drop-item" onClick={() => setSubsOpen(false)}>
                        <span className="dot" />
                        {item.label}
                      </a>
                      {i === 2 && <div className="drop-divider" />}
                    </div>
                  ))}
                </div>
              </div>

            </nav>

            {/* ── Shop CTA ── */}
            <div className="hidden lg:block">
              <button className="shop-btn">
                <span>Shop Now</span>
              </button>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              className="lg:hidden flex flex-col justify-center items-end gap-[7px] w-8 h-8 text-[#f5f0e8] relative z-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="hamburger-line w-6" style={{
                transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none",
                background: menuOpen ? "#c9a96e" : "currentColor",
              }} />
              <span className="hamburger-line w-4" style={{ opacity: menuOpen ? 0 : 1 }} />
              <span className="hamburger-line" style={{
                width: menuOpen ? "24px" : "20px",
                transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
                background: menuOpen ? "#c9a96e" : "currentColor",
              }} />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile Menu ─── */}
      <div className={`mobile-overlay ${menuOpen ? "open" : ""}`}>
        <div className="grain-overlay" />

        {/* Top bar */}
        <div className="flex items-center justify-between px-6 h-[84px] border-b border-white/[0.07] shrink-0">
          <a href="/" className="logo-link" onClick={() => setMenuOpen(false)}>
            <Image src="/logo.png" alt="Logo" width={160} height={46} className="logo-img" style={{ height: "44px" }} />
          </a>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col px-6 pt-2 pb-6 flex-1 relative z-10">

          <a href="/" className="m-nav-item" onClick={() => setMenuOpen(false)}>Home</a>

          {/* About accordion */}
          <button className="m-nav-item" onClick={() => setMobileAbout(p => !p)}>
            About
            <span className={`chev ${mobileAbout ? "up" : ""}`} style={{ marginRight: 6, color: "var(--gold)" }} />
          </button>
          <div className={`m-sub-list ${mobileAbout ? "open" : ""}`}>
            {ABOUT_LINKS.map(item => (
              <a key={item.label} href={item.href} className="m-sub-item" onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>

          <a href="#services" className="m-nav-item" onClick={() => setMenuOpen(false)}>Our Services</a>

          {/* Subsidiaries accordion */}
          <button className="m-nav-item" onClick={() => setMobileSubs(p => !p)}>
            Our Subsidiaries
            <span className={`chev ${mobileSubs ? "up" : ""}`} style={{ marginRight: 6, color: "var(--gold)" }} />
          </button>
          <div className={`m-sub-list ${mobileSubs ? "open" : ""}`}>
            {SUBSIDIARIES.map(item => (
              <a key={item.label} href={item.href} className="m-sub-item" onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>

        </nav>

        {/* Bottom CTA */}
        <div className="px-6 pb-10 shrink-0 relative z-10">
          <button
            className="shop-btn w-full text-center"
            style={{ clipPath: "none", borderRadius: "2px", width: "100%" }}
            onClick={() => setMenuOpen(false)}
          >
            <span>Shop Now</span>
          </button>
        </div>
      </div>
    </>
  );
}