"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";

const TEAM = [
  {
    name: "Adamu Markbrand",
    role: "Founder & CEO",
    bio: "Visionary leader with over 10 years driving Markbrand's growth across Nigeria and beyond.",
    img: "/img1.jpg",
  },
  {
    name: "Fatima Yusuf",
    role: "Creative Director",
    bio: "Award-winning designer shaping brand identities that leave a lasting impression.",
    img: "/img2.jpg",
  },
  {
    name: "Ibrahim Musa",
    role: "Head of Print",
    bio: "Master of precision print production, ensuring every project meets world-class standards.",
    img: "/img3.jpg",
  },
  {
    name: "Zainab Abubakar",
    role: "Brand Strategist",
    bio: "Crafting compelling brand narratives that connect businesses to their audience.",
    img: "/img4.jpg",
  },
  {
    name: "Emmanuel Okafor",
    role: "Media Producer",
    bio: "Bringing ideas to life through powerful visual storytelling and media production.",
    img: "/img5.jpg",
  },
  {
    name: "Hauwa Garba",
    role: "Client Relations",
    bio: "Building lasting partnerships through exceptional service and deep client understanding.",
    img: "/img6.jpg",
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

export default function TeamPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Nunito+Sans:wght@300;400;500;600;700&display=swap');

        :root {
          --green: #6ECB63;
          --green-dark: #5BB855;
          --text: #1a1a1a;
          --muted: #6b6b6b;
          --bg: #ffffff;
          --border: #e4ead8;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .team-page {
          font-family: 'Nunito Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
          overflow-x: hidden;
        }

        /* Header Section */
        .team-header {
          background: var(--bg);
          padding: 120px 40px 80px;
          text-align: center;
          margin-top: 88px;
        }

        @media (max-width: 768px) {
          .team-header {
            padding: 80px 24px 60px;
            margin-top: 80px;
          }
        }

        .team-header-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--green);
          margin-bottom: 18px;
        }

        .team-header-label::before,
        .team-header-label::after {
          content: '';
          width: 28px;
          height: 1.5px;
          background: var(--green);
        }

        .team-header-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 5vw, 4.2rem);
          font-weight: 700;
          line-height: 1.08;
          color: var(--text);
          margin-bottom: 20px;
        }

        .team-header-desc {
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.8;
          color: var(--muted);
          max-width: 600px;
          margin: 0 auto;
        }

        /* Container */
        .team-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px 100px;
        }

        @media (max-width: 768px) {
          .team-container {
            padding: 0 24px 80px;
          }
        }

        /* Grid */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          margin-top: 60px;
        }

        @media (max-width: 1024px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
            margin-top: 48px;
          }
        }

        @media (max-width: 640px) {
          .team-grid {
            grid-template-columns: 1fr;
            gap: 28px;
            margin-top: 40px;
          }
        }

        /* Team Card */
        .team-card {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          background: var(--bg);
          border: 1px solid var(--border);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          cursor: pointer;
        }

        .team-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(110, 203, 99, 0.15);
        }

        /* Image Container */
        .team-card-image {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: #f5faf0;
        }

        .team-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .team-card:hover .team-card-image img {
          transform: scale(1.05);
        }

        /* Gradient Overlay */
        .team-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(255, 255, 255, 0.8), transparent);
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .team-card:hover .team-image-overlay {
          opacity: 1;
        }

        /* Green accent line on hover */
        .team-accent-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--green);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .team-card:hover .team-accent-line {
          transform: scaleX(1);
        }

        /* Content */
        .team-card-content {
          padding: 24px 20px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .team-card-content {
            padding: 20px 18px;
          }
        }

        .team-card-role {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--green);
          margin-bottom: 10px;
          display: block;
        }

        .team-card-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 2px;
          line-height: 1.2;
        }

        @media (max-width: 768px) {
          .team-card-name {
            font-size: 1.1rem;
          }
        }

        /* Bio Hidden until hover (desktop only) */
        .team-card-bio {
          font-size: 0.8rem;
          color: var(--muted);
          line-height: 1.6;
          margin-top: 12px;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.35s ease, opacity 0.35s ease;
        }

        @media (hover: hover) {
          .team-card:hover .team-card-bio {
            max-height: 100px;
            opacity: 1;
          }
        }

        /* Show bio on mobile */
        @media (max-width: 768px) {
          .team-card-bio {
            max-height: 100px;
            opacity: 1;
            margin-top: 12px;
          }
        }
      `}</style>

      <Navbar />

      <div className="team-page">
        {/* Header */}
        <div className="team-header">
          <Fade className="w-full">
            <span className="team-header-label">
              <span>Our Talented Team</span>
            </span>
            <h1 className="team-header-title">Meet Our Team</h1>
            <p className="team-header-desc">
              A collective of creatives, strategists, and print specialists dedicated to bringing your vision to life with excellence and innovation.
            </p>
          </Fade>
        </div>

        {/* Team Grid */}
        <div className="team-container">
          <div className="team-grid">
            {TEAM.map((member, i) => (
              <Fade key={member.name} delay={i * 80}>
                <div className="team-card">
                  {/* Accent Line */}
                  <div className="team-accent-line" />

                  {/* Image */}
                  <div className="team-card-image">
                    <img src={member.img} alt={member.name} />
                    <div className="team-image-overlay" />
                  </div>

                  {/* Content */}
                  <div className="team-card-content">
                    <span className="team-card-role">{member.role}</span>
                    <h3 className="team-card-name">{member.name}</h3>
                    <p className="team-card-bio">{member.bio}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
