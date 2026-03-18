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
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Fade({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
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

export default function OurStory() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Nunito+Sans:wght@300;400;500;600;700&display=swap');

        :root {
          --gold:    #a8e6a1;
          --text:    #1c1c1c;
          --muted:   #6b6b6b;
          --bg-warm: #faf8f5;
          --border:  #e8e2da;
          --shadow:  rgba(0,0,0,0.08);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .our-story-section {
          font-family: 'Nunito Sans', sans-serif;
          background: #ffffff;
          padding: 100px 0;
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px;
        }
        @media (max-width: 560px) { .container { padding: 0 20px; } }

        /* ── two-column grid ── */
        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
        }
        @media (max-width: 800px) {
          .story-grid { grid-template-columns: 1fr; gap: 48px; }
        }

        /* ── image stack (left) ── */
        .story-vis {
          position: relative;
          padding-bottom: 56px;
          padding-right: 40px;
        }
        @media (max-width: 800px) {
          .story-vis { padding-right: 0; padding-bottom: 44px; }
        }

        .story-img-main {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          border-radius: 4px;
          overflow: hidden;
        }

        .story-img-accent {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 52%;
          aspect-ratio: 1 / 1;
          border-radius: 4px;
          border: 5px solid #ffffff;
          overflow: hidden;
          box-shadow: 0 10px 36px var(--shadow);
        }

        .story-tag {
          position: absolute;
          top: 28px;
          left: -16px;
          background: var(--gold);
          color: #ffffff;
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 700;
          padding: 10px 18px;
          border-radius: 3px;
          box-shadow: 0 6px 20px rgba(201, 169, 110, 0.4);
          z-index: 2;
        }

        /* ── copy (right) ── */
        .story-copy { padding-left: 8px; }
        @media (max-width: 800px) { .story-copy { padding-left: 0; } }

        .sec-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 14px;
        }
        .sec-label::before {
          content: '';
          width: 22px;
          height: 1.5px;
          background: var(--gold);
          flex-shrink: 0;
        }

        .sec-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.9rem, 3vw, 3rem);
          font-weight: 700;
          line-height: 1.15;
          color: var(--text);
          margin-bottom: 18px;
        }
        .sec-title em { font-style: italic; color: var(--gold); }

        .sec-body {
          font-size: 0.98rem;
          line-height: 1.82;
          color: var(--muted);
        }

        .story-quote {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          font-style: italic;
          font-weight: 400;
          color: var(--text);
          line-height: 1.65;
          border-left: 3px solid var(--gold);
          padding-left: 22px;
          margin: 28px 0;
        }
      `}</style>

      <section className="our-story-section" id="our-story">
        <div className="container">
          <div className="story-grid">

            {/* ── Images ── */}
            <Fade>
              <div className="story-vis">
                <span className="story-tag">Est. 2016</span>

                {/* Main large image */}
                <div className="story-img-main">
                  <Image
                    src="/story.jpg"
                    alt="Our Story"
                    fill
                    sizes="(max-width: 800px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                {/* Small overlapping accent image */}
                <div className="story-img-accent">
                  <Image
                    src="/story3.jpg"
                    alt="MarkBrand moment"
                    fill
                    sizes="26vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </Fade>

            {/* ── Copy ── */}
            <Fade delay={140} className="story-copy">
              <span className="sec-label">Our Story</span>
              <h2 className="sec-title">
                From One Vision to<br />
                <em>Many Legacies</em>
              </h2>
              <p className="sec-body">
                MarkBrand began as a single bold idea — that African excellence
                deserved a global platform. What started as a creative studio in
                2016 has grown into a constellation of brands, each distinct in
                its industry, unified by the same relentless standard.
              </p>
              <blockquote className="story-quote">
                "We do not build companies. We build institutions that outlast us."
              </blockquote>
              <p className="sec-body">
                Today, MarkBrand spans six subsidiaries operating across
                entertainment, media, lifestyle, and education. Every brand we
                launch carries the DNA of our founding ethos — excellence,
                integrity, and impact.
              </p>
            </Fade>

          </div>
        </div>
      </section>
    </>
  );
}