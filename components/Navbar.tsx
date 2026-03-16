"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },
  { label: "Journal", href: "#journal" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

        .nav-root {
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Logo image ── */
        .logo-img {
          height: 36px;
          width: auto;
          object-fit: contain;
          /* Make pure-white or light logos pop on dark bg */
          filter: brightness(1.1) drop-shadow(0 0 8px rgba(201,169,110,0.25));
          transition: filter 0.35s ease, transform 0.35s ease;
        }

        .logo-link:hover .logo-img {
          filter: brightness(1.25) drop-shadow(0 0 14px rgba(201,169,110,0.5));
          transform: scale(1.03);
        }

        /* Scrolled: slightly smaller logo */
        .scrolled .logo-img {
          height: 30px;
        }

        .nav-link {
          position: relative;
          font-size: 0.8125rem;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: inherit;
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #c9a96e;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .nav-link:hover {
          color: #c9a96e;
        }

        .cta-btn {
          position: relative;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 10px 24px;
          border: 1px solid currentColor;
          background: transparent;
          cursor: pointer;
          overflow: hidden;
          transition: color 0.4s ease;
        }

        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #c9a96e;
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cta-btn:hover::before {
          transform: translateX(0);
        }

        .cta-btn:hover {
          color: #0c0c0c;
          border-color: #c9a96e;
        }

        .cta-btn span {
          position: relative;
          z-index: 1;
        }

        /* ── Mobile full-screen menu ── */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: #0c0c0c;
          z-index: 40;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.55s cubic-bezier(0.77, 0, 0.175, 1);
        }

        .mobile-overlay.open {
          transform: translateX(0);
        }

        .mobile-link {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 300;
          font-style: italic;
          color: #f5f0e8;
          text-decoration: none;
          letter-spacing: 0.03em;
          line-height: 1.15;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.4s ease, transform 0.4s ease, color 0.3s ease;
        }

        .mobile-link:hover {
          color: #c9a96e;
        }

        .mobile-overlay.open .mobile-link {
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-overlay.open .mobile-link:nth-child(1) { transition-delay: 0.10s; }
        .mobile-overlay.open .mobile-link:nth-child(2) { transition-delay: 0.18s; }
        .mobile-overlay.open .mobile-link:nth-child(3) { transition-delay: 0.26s; }
        .mobile-overlay.open .mobile-link:nth-child(4) { transition-delay: 0.34s; }

        .hamburger-line {
          display: block;
          height: 1px;
          background: currentColor;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.25s ease,
                      width 0.35s ease;
          transform-origin: center;
        }

        .grain-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.035;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }

        .nav-backdrop {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
      `}</style>

      {/* ─── Main Navbar ─── */}
      <header
        className={`nav-root fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "scrolled nav-backdrop bg-[#0c0c0c]/90 border-b border-white/[0.07]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-[72px]">

            {/* ── Logo Image ── */}
            <a href="/" className="logo-link flex items-center select-none" aria-label="Forme Studio — Home">
              <Image
                src="/logo.png"
                alt="Forme Studio"
                width={160}
                height={40}
                priority
                className="logo-img"
              />
            </a>

            {/* ── Desktop Nav Links ── */}
            <nav className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`nav-link text-[#b8b0a4] hover:text-[#c9a96e] ${
                    activeLink === link.label ? "active" : ""
                  }`}
                  onClick={() => setActiveLink(link.label)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* ── Right Actions ── */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Award badge */}
              <div className="flex items-center gap-2 text-[#6b6560]">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 0L7.35 4.15L11.71 4.15L8.18 6.72L9.53 10.87L6 8.3L2.47 10.87L3.82 6.72L0.29 4.15L4.65 4.15L6 0Z"
                    fill="#c9a96e"
                    opacity="0.7"
                  />
                </svg>
               
              </div>

              <div className="w-px h-4 bg-white/10" />

              <button className="cta-btn text-[#f5f0e8]">
                <span>Start a Project</span>
              </button>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              className="lg:hidden flex flex-col justify-center items-end gap-[7px] w-8 h-8 text-[#f5f0e8] relative z-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className="hamburger-line w-6"
                style={{
                  transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none",
                  background: menuOpen ? "#c9a96e" : "currentColor",
                }}
              />
              <span
                className="hamburger-line w-4"
                style={{
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? "translateX(8px)" : "none",
                }}
              />
              <span
                className="hamburger-line w-5"
                style={{
                  transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
                  width: menuOpen ? "24px" : undefined,
                  background: menuOpen ? "#c9a96e" : "currentColor",
                }}
              />
            </button>
          </div>
        </div>

        {/* Gradient rule under navbar when unscrolled */}
        <div
          className={`hidden lg:flex items-center overflow-hidden h-[1px] transition-opacity duration-500 ${
            scrolled ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </header>

      {/* ─── Mobile Full-screen Menu ─── */}
      <div ref={menuRef} className={`mobile-overlay ${menuOpen ? "open" : ""}`}>
        <div className="grain-overlay" />

        {/* Top bar inside overlay */}
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-white/[0.07] shrink-0">
          <a href="/" className="logo-link flex items-center select-none" aria-label="Forme Studio — Home">
            <Image
              src="/logo.png"
              alt="Forme Studio"
              width={130}
              height={34}
              className="logo-img"
              style={{ height: "30px" }}
            />
          </a>
        </div>

        {/* Links */}
        <nav className="flex flex-col justify-center flex-1 px-8 gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Bottom info row */}
        <div className="px-8 pb-10 flex items-end justify-between">
          <div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#6b6560",
                marginBottom: "6px",
              }}
            >
              Available for projects
            </p>
            <a
              href="mailto:hello@formestudio.co"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                color: "#b8b0a4",
                textDecoration: "none",
              }}
            >
              hello@formestudio.co
            </a>
          </div>

          <button
            className="cta-btn text-[#f5f0e8] border-[#f5f0e8]/20"
            onClick={() => setMenuOpen(false)}
          >
            <span>Start a Project</span>
          </button>
        </div>
      </div>
    </>
  );
}