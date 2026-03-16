"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SERVICES = [
  {
    id: 1,
    img: "/img1.jpg",
    label: "Commercial Printing",
    title: "World-Class Print, Every Time",
    body: "From business cards to large-format banners — vibrant, precision output at any scale for any brand.",
    tags: ["Large-Format Printing", "Digital & Offset", "Packaging & Labels", "Corporate Stationery"],
  },
  {
    id: 2,
    img: "/img2.jpg",
    label: "Creative Branding",
    title: "Identities That Endure",
    body: "We craft bold, strategic brand identities that communicate who you are before you say a word.",
    tags: ["Logo & Identity Design", "Brand Guidelines", "Visual Systems", "Packaging Design"],
  },
  {
    id: 3,
    img: "/img3.jpg",
    label: "Photography",
    title: "Visuals That Tell Your Story",
    body: "Professional photography for brands — product shoots, corporate portraits, event coverage and more.",
    tags: ["Product Photography", "Corporate Portraits", "Event Coverage", "Editorial Shoots"],
  },
  {
    id: 4,
    img: "/img4.jpg",
    label: "Media Production",
    title: "Content That Moves People",
    body: "Full-service media production from concept to final cut — commercials, social content, motion graphics.",
    tags: ["Brand Films & Commercials", "Social Media Content", "Motion Graphics", "Post-Production"],
  },
  {
    id: 5,
    img: "/img5.jpg",
    label: "Fashion & Tailoring",
    title: "Style That Represents Your Brand",
    body: "Custom uniforms, branded corporate wear, and fashion pieces crafted to make your team look the part.",
    tags: ["Corporate Uniforms", "Branded Apparel", "Event Outfits", "Bespoke Tailoring"],
  },
  {
    id: 6,
    img: "/img6.jpg",
    label: "Digital Education",
    title: "Knowledge That Empowers Growth",
    body: "Through our Swift Trading Academy and digital learning programmes, we equip people to grow and compete.",
    tags: ["Business Development", "Digital Marketing", "Financial Literacy", "Entrepreneurship"],
  },
];

function useFadeIn(threshold = 0.1) {
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
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(30px)",
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Nunito+Sans:wght@300;400;500;600;700&display=swap');

        :root {
          --gold:      #c9a96e;
          --gold-lt:   #e8d5b0;
          --gold-dk:   #a8834a;
          --text:      #1a1a1a;
          --muted:     #6b6b6b;
          --soft:      #9a9490;
          --bg:        #ffffff;
          --bg-warm:   #ffffff;
          --bg-cream:  #ffffff;
          --border:    #e8e2da;
          --shadow-sm: rgba(0,0,0,0.06);
          --shadow-md: rgba(0,0,0,0.1);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .sp {
          font-family: 'Nunito Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
          overflow-x: hidden;
        }

        /* ── PAGE HEADER ── */
        .sp-header {
          background: var(--bg-warm);
          padding: 100px 0 72px;
          border-bottom: 1px solid var(--border);
          text-align: center;
        }

        .sp-header-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 18px;
        }
        .sp-header-label::before,
        .sp-header-label::after {
          content: '';
          width: 28px; height: 1.5px;
          background: var(--gold);
        }

        .sp-header-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 5vw, 4.2rem);
          font-weight: 700;
          line-height: 1.08;
          color: var(--text);
          margin-bottom: 20px;
        }
        .sp-header-title em { font-style: italic; color: var(--gold); }

        .sp-header-sub {
          font-size: 1rem;
          line-height: 1.75;
          color: var(--muted);
          max-width: 520px;
          margin: 0 auto;
        }

        /* ── SERVICES GRID ── */
        .sp-grid-wrap {
          padding: 80px 0 100px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }
        @media (max-width: 560px) { .container { padding: 0 20px; } }

        .sp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        @media (max-width: 1020px) { .sp-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px)  { .sp-grid { grid-template-columns: 1fr; gap: 24px; } }

        /* ── SERVICE CARD ── */
        .svc-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 6px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .svc-card:hover {
          box-shadow: 0 16px 48px var(--shadow-md);
          transform: translateY(-5px);
        }

        /* image */
        .svc-img {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: var(--bg-cream);
        }
        .svc-img img {
          transition: transform 0.55s cubic-bezier(0.4,0,0.2,1) !important;
        }
        .svc-card:hover .svc-img img {
          transform: scale(1.06) !important;
        }

        /* gold top accent */
        .svc-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--gold);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.38s cubic-bezier(0.4,0,0.2,1);
          z-index: 1;
        }
        .svc-card { position: relative; }
        .svc-card:hover::before { transform: scaleX(1); }

        /* body */
        .svc-body {
          padding: 28px 28px 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .svc-label {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold-dk);
          margin-bottom: 8px;
        }

        .svc-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.55rem;
          font-weight: 700;
          line-height: 1.2;
          color: var(--text);
          margin-bottom: 12px;
        }

        .svc-body-text {
          font-size: 0.88rem;
          line-height: 1.75;
          color: var(--muted);
          margin-bottom: 20px;
          flex: 1;
        }

        /* tags */
        .svc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 22px;
        }
        .svc-tag {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: var(--soft);
          background: #f2efe9;
          border: 1px solid var(--border);
          padding: 4px 10px;
          border-radius: 2px;
          white-space: nowrap;
        }

        /* learn more link */
        .svc-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold-dk);
          text-decoration: none;
          border-bottom: 1.5px solid var(--gold-lt);
          padding-bottom: 2px;
          transition: color 0.22s, border-color 0.22s, gap 0.22s;
          align-self: flex-start;
        }
        .svc-link:hover {
          color: var(--gold);
          border-color: var(--gold);
          gap: 12px;
        }

        /* ── BOTTOM CTA STRIP ── */
        .sp-cta {
          background: var(--bg-cream);
          border-top: 1px solid var(--border);
          padding: 72px 0;
          text-align: center;
        }
        .sp-cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 700;
          color: var(--text);
          margin-bottom: 14px;
          line-height: 1.15;
        }
        .sp-cta-title em { font-style: italic; color: var(--gold); }
        .sp-cta-sub {
          font-size: 0.96rem;
          color: var(--muted);
          max-width: 420px;
          margin: 0 auto 32px;
          line-height: 1.7;
        }
        .sp-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #fff;
          background: var(--text);
          padding: 13px 28px;
          border-radius: 3px;
          border: 2px solid var(--text);
          text-decoration: none;
          transition: background 0.28s, border-color 0.28s, box-shadow 0.28s;
        }
        .sp-cta-btn:hover {
          background: var(--gold);
          border-color: var(--gold);
          box-shadow: 0 6px 24px rgba(201,169,110,0.3);
        }
      `}</style>

      <div className="sp">

        {/* ── HEADER ── */}
        <div className="sp-header">
          <Fade>
            <div className="sp-header-label">What We Do</div>
            <h1 className="sp-header-title">
              Our <em>Services</em>
            </h1>
            <p className="sp-header-sub">
              From the first print to a full brand identity — world-class creative and production services under one roof.
            </p>
          </Fade>
        </div>

        {/* ── GRID ── */}
        <div className="sp-grid-wrap">
          <div className="container">
            <div className="sp-grid">
              {SERVICES.map((svc, i) => (
                <Fade key={svc.id} delay={i * 70}>
                  <div className="svc-card">

                    {/* Image */}
                    <div className="svc-img">
                      <Image
                        src={svc.img}
                        alt={svc.label}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 1020px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    {/* Body */}
                    <div className="svc-body">
                      <span className="svc-label">{svc.label}</span>
                      <h2 className="svc-title">{svc.title}</h2>
                      <p className="svc-body-text">{svc.body}</p>

                      <div className="svc-tags">
                        {svc.tags.map(tag => (
                          <span key={tag} className="svc-tag">{tag}</span>
                        ))}
                      </div>

                      <a href="#contact" className="svc-link">
                        Learn More <span>→</span>
                      </a>
                    </div>

                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="sp-cta">
          <Fade>
            <h2 className="sp-cta-title">
              Ready to Build<br /><em>Something Great?</em>
            </h2>
            <p className="sp-cta-sub">
              Let's talk about your project. Our team is ready to deliver excellence from day one.
            </p>
            <a href="#contact" className="sp-cta-btn">
              Get In Touch →
            </a>
          </Fade>
        </div>

      </div>
    </>
  );
}