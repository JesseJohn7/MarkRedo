"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const GALLERY_ITEMS = [
  { id: 1, img: "/img1.jpg", title: "Commercial Printing", category: "Print" },
  { id: 2, img: "/img2.jpg", title: "Creative Branding", category: "Branding" },
  { id: 3, img: "/img3.jpg", title: "Professional Photography", category: "Photography" },
  { id: 4, img: "/img4.jpg", title: "Media Production", category: "Video" },
  { id: 5, img: "/img5.jpg", title: "Fashion Design", category: "Fashion" },
  { id: 6, img: "/img6.jpg", title: "Digital Education", category: "Education" },
  { id: 7, img: "/img1.jpg", title: "Brand Strategy", category: "Branding" },
  { id: 8, img: "/img2.jpg", title: "Event Coverage", category: "Photography" },
  { id: 9, img: "/img3.jpg", title: "Corporate Uniforms", category: "Fashion" },
];

const CATEGORIES = ["All", "Print", "Branding", "Photography", "Video", "Fashion", "Education"];

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
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = selectedCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

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
          color: var(--text);
          margin-bottom: 20px;
        }

        .gallery-header-desc {
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.8;
          color: var(--muted);
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

        /* Filter Buttons */
        .gallery-filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin: 60px 0 50px;
          padding: 0 20px;
        }

        @media (max-width: 768px) {
          .gallery-filters {
            margin: 48px 0 40px;
            gap: 10px;
          }
        }

        .filter-btn {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 10px 22px;
          background: transparent;
          color: var(--muted);
          border: 1.5px solid var(--border);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .filter-btn:hover,
        .filter-btn.active {
          color: var(--bg);
          background: var(--green);
          border-color: var(--green);
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

        /* Overlay */
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(110, 203, 99, 0.7), rgba(91, 184, 85, 0.7));
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.35s ease;
          padding: 20px;
          text-align: center;
        }

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
          {/* Filters */}
          <div className="gallery-filters">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {filteredItems.map((item, i) => (
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
                    <div className="overlay-category">{item.category}</div>
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
