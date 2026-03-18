"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const GALLERY_ITEMS = [
  { id: 1, img: "/img1.jpg", title: "Commercial Printing" },
  { id: 2, img: "/img2.jpg", title: "Creative Branding" },
  { id: 3, img: "/img3.jpg", title: "Professional Photography" },
  { id: 4, img: "/img4.jpg", title: "Media Production" },
  { id: 5, img: "/img5.jpg", title: "Fashion Design" },
  { id: 6, img: "/img6.jpg", title: "Digital Education" },
  { id: 7, img: "/img1.jpg", title: "Brand Strategy" },
  { id: 8, img: "/img2.jpg", title: "Event Coverage" },
  { id: 9, img: "/img3.jpg", title: "Corporate Uniforms" },
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

export default function Gallery() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Nunito+Sans:wght@300;400;500;600;700&display=swap');

        :root {
          --green: #a8e6a1;
          --green-dark: #5BB855;
          --text: #1a1a1a;
          --muted: #6b6b6b;
          --bg: #ffffff;
          --border: #e4ead8;
          --light-bg: #faf9f7;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .gallery-page {
          font-family: 'Nunito Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
          overflow-x: hidden;
        }

        /* Header */
        .gallery-header {
          background: var(--bg);
          padding: 120px 40px 80px;
          text-align: center;
          margin-top: 88px;
        }

        @media (max-width: 768px) {
          .gallery-header {
            padding: 80px 24px 60px;
            margin-top: 80px;
          }
        }

        .gallery-header-label {
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

        .gallery-header-label::before,
        .gallery-header-label::after {
          content: '';
          width: 28px;
          height: 1.5px;
          background: var(--green);
        }

        .gallery-header-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 5vw, 4.2rem);
          font-weight: 700;
          line-height: 1.08;
          color: var(--green);
          margin-bottom: 20px;
        }

        .gallery-header-desc {
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.8;
          color: var(--green);
          max-width: 600px;
          margin: 0 auto;
        }

        /* Container */
        .gallery-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px 100px;
        }

        @media (max-width: 768px) {
          .gallery-container {
            padding: 0 24px 80px;
          }
        }

        /* Gallery Grid */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        @media (max-width: 640px) {
          .gallery-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        /* Gallery Item */
        .gallery-item {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          aspect-ratio: 1;
          background: var(--light-bg);
          cursor: pointer;
          group: hover;
        }

        .gallery-item-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-item:hover .gallery-item-image {
          transform: scale(1.08);
        }

        /* Over20px;
          margin-top: 40px;
        }

        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 18px;
          }
        }

        @media (max-width: 640px) {
          .gallery-grid {
            grid-template-columns: 1fr;
            gap: 16

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .overlay-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: white;
          margin-bottom: 8px;
        }

        .overlay-category {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.9);
        }

        /* Accent border on hover */
        .gallery-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: white;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
        }

        .gallery-item:hover .gallery-accent {
          transform: scaleX(1);
        }
      `}</style>

      <div className="gallery-page">
        {/* Header */}
        <div className="gallery-header">
          <Fade className="w-full">
            <span className="gallery-header-label">
              <span>Our Work & Projects</span>
            </span>
            <h1 className="gallery-header-title">Gallery</h1>
            <p className="gallery-header-desc">
              Explore our diverse portfolio of creative work spanning branding, design, photography, and production across Nigeria and beyond.
            </p>
          </Fade>
        </div>

        {/* Container */}
        <div className="gallery-container">
          {/* Gallery Grid */}
          <div className="gallery-grid">
            {GALLERY_ITEMS.map((item, i) => (
              <Fade key={item.id} delay={i * 50}>
                <div className="gallery-item">
                  <div className="gallery-accent" />
                  <img
                    src={item.img}
                    alt={item.title}
                    className="gallery-item-image"
                  />
                  <div className="gallery-overlay">
                    <div className="overlay-title">{item.title}</div>
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