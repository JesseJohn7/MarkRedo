"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function useFadeIn(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Fade({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Nunito+Sans:wght@300;400;500;600;700&display=swap');

        :root {
          --gold:       #c9a96e;
          --gold-lt:    #e8d5b0;
          --gold-dk:    #a8834a;
          --text:       #1c1c1c;
          --muted:      #6b6b6b;
          --bg:         #ffffff;
          --bg-warm:    #faf8f5;
          --bg-cream:   #f5f0e8;
          --border:     #e8e2da;
          --shadow:     rgba(0,0,0,0.07);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ap {
          font-family: 'Nunito Sans', sans-serif;
          color: var(--text);
          background: var(--bg);
          overflow-x: hidden;
        }

        /* ─── HERO ─── */
        .hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 90vh;
          padding-top: 88px;
        }
        @media (max-width: 860px) {
          .hero { grid-template-columns: 1fr; min-height: auto; padding-top: 96px; }
          .hero-vis { display: none; }
        }

        .hero-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 72px 56px 72px 72px;
        }
        @media (max-width: 1100px) { .hero-copy { padding: 56px 40px 56px 48px; } }
        @media (max-width: 860px)  { .hero-copy { padding: 48px 24px 64px; } }

        .hero-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.6rem, 4.5vw, 4.6rem);
          font-weight: 700;
          line-height: 1.07;
          letter-spacing: -0.01em;
          color: var(--text);
          margin-bottom: 24px;
        }
        .hero-h1 em { font-style: italic; color: var(--gold); }

        .hero-lead {
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--muted);
          max-width: 460px;
          margin-bottom: 40px;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #fff;
          background: var(--text);
          padding: 14px 30px;
          border: 2px solid var(--text);
          border-radius: 3px;
          text-decoration: none;
          transition: background 0.28s, border-color 0.28s, box-shadow 0.28s;
          align-self: flex-start;
        }
        .btn-primary:hover {
          background: var(--gold);
          border-color: var(--gold);
          box-shadow: 0 6px 24px rgba(201,169,110,0.35);
        }
        .btn-arrow { transition: transform 0.22s; }
        .btn-primary:hover .btn-arrow { transform: translateX(4px); }

        /* hero visual */
        .hero-vis {
          position: relative;
          overflow: hidden;
        }
        .hero-badge {
          position: absolute;
          bottom: 48px;
          right: 44px;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 20px 24px;
          text-align: center;
          box-shadow: 0 10px 36px var(--shadow);
          z-index: 2;
        }
        .hero-badge-num {
          font-family: 'Playfair Display', serif;
          font-size: 2.4rem;
          font-weight: 700;
          color: var(--gold);
          line-height: 1;
        }
        .hero-badge-lbl {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--muted);
          margin-top: 5px;
        }

      `}</style>

      <div className="ap">

        {/* ══════ HERO ══════ */}
        <section className="hero">

          <div className="hero-copy">
            <Fade delay={0}>
              <h1 className="hero-h1">
                Building Brands That<br />
                <em>Define Generations</em>
              </h1>
            </Fade>
            <Fade delay={120}>
              <p className="hero-lead">
                MarkBrand is a multi-industry holding company driven by a singular obsession creating brands that don't just compete, but lead. From film to finance, from hospitality to media, we build with purpose.
              </p>
            </Fade>
            <Fade delay={220}>
              <a href="#our-story" className="btn-primary">
                Discover Our Story
                <span className="btn-arrow">→</span>
              </a>
            </Fade>
          </div>

          <div className="hero-vis">
            <Image
              src="/hero.jpg"
              alt="MarkBrand"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <div className="hero-badge">
              <div className="hero-badge-num">2016</div>
              <div className="hero-badge-lbl">Est. Year</div>
            </div>
          </div>

        </section>

      </div>
    </>
  );
}