"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

/* ─── Token constants ─── */
const GOLD = "#b8924a";
const GOLD_LIGHT = "#d4aa6a";
const CREAM = "#fdfaf6";
const INK = "#1c1814";
const MUTED = "#9e9389";
const BORDER = "rgba(28,24,20,0.1)";

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const charVariant = {
  hidden: { y: "110%", opacity: 0 },
  show: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.05 * i },
  }),
};

const scaleIn = {
  hidden: { scale: 0.6, opacity: 0 },
  show: (delay = 0) => ({
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 14, delay },
  }),
};

const slideInRight = {
  hidden: { x: 60, opacity: 0 },
  show: (delay = 0) => ({
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

/* ─── Split text helper ─── */
function AnimatedWord({ word, startDelay = 0 }: { word: string; startDelay?: number }) {
  return (
    <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i + startDelay}
          variants={charVariant}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

const STATS = [
  { value: "140+", label: "Brands Built" },
  { value: "12", label: "Years of Craft" },
  { value: "3×", label: "Awwwards" },
];

const MARQUEE_ITEMS = [
  "Brand Strategy", "Visual Identity", "Motion Design",
  "Digital Experience", "Art Direction", "Brand Systems",
  "Brand Strategy", "Visual Identity", "Motion Design",
  "Digital Experience", "Art Direction", "Brand Systems",
];

const TAGS = [
  { label: "Nike — Rebrand '24", top: "26%", right: "26%", delay: 1.0 },
  { label: "Tesla — Campaign", top: "50%", right: "10%", delay: 1.15 },
  { label: "Adidas — Identity", top: "66%", right: "30%", delay: 1.3 },
];

/* ─── Background image URL (Unsplash — bright airy creative studio) ─── */
const BG_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  /* Parallax on scroll */
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  /* Mouse tilt on circle */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set(((e.clientX - cx) / rect.width) * 18);
    mouseY.set(((e.clientY - cy) / rect.height) * 18);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Jost:wght@300;400;500&display=swap');

        html, body { background: ${CREAM}; }

        .hero-wrap {
          background: ${CREAM};
          font-family: 'Jost', sans-serif;
          color: ${INK};
          min-height: 100svh;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* ── BG image layer ── */
        .hero-bg-image {
          position: absolute;
          inset: 0;
          z-index: 0;
          will-change: transform;
        }
        .hero-bg-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        /* Light wash overlay so text stays crisp — warm ivory, not dark */
        .hero-bg-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            108deg,
            rgba(253,250,246,0.93) 0%,
            rgba(253,250,246,0.82) 45%,
            rgba(253,250,246,0.55) 100%
          );
        }
        /* Extra right-side feather so tags are readable */
        .hero-bg-overlay-right {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            to left,
            rgba(253,250,246,0.72) 0%,
            transparent 55%
          );
        }

        /* ── Content ── */
        .hero-content {
          position: relative;
          z-index: 4;
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 0 5%;
          padding-top: clamp(110px, 15vh, 170px);
        }

        /* ── Eyebrow ── */
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 0.68rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: ${GOLD};
          font-weight: 500;
        }
        .eyebrow-rule {
          display: block;
          width: 36px;
          height: 1px;
          background: ${GOLD};
          flex-shrink: 0;
        }

        /* ── Headline ── */
        .headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          font-size: clamp(3.8rem, 10vw, 10.5rem);
          line-height: 0.88;
          letter-spacing: -0.025em;
          color: ${INK};
          margin-top: clamp(20px, 3vh, 36px);
        }
        .headline-italic {
          font-style: italic;
          color: ${GOLD};
        }
        .headline-outline {
          -webkit-text-stroke: 1.5px ${INK};
          color: transparent;
        }

        /* ── Gold rule ── */
        .gold-rule {
          height: 1px;
          background: linear-gradient(to right, ${GOLD_LIGHT}, transparent);
          max-width: 520px;
          margin: clamp(18px, 2.8vh, 32px) 0;
          transform-origin: left;
        }

        /* ── Sub-text ── */
        .sub-text {
          font-size: clamp(0.9rem, 1.3vw, 1.05rem);
          font-weight: 300;
          line-height: 1.82;
          color: ${MUTED};
          max-width: 380px;
        }

        /* ── CTA primary ── */
        .cta-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: ${INK};
          color: ${CREAM};
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 14px 30px;
          text-decoration: none;
          overflow: hidden;
          border: none;
          cursor: pointer;
          transition: color 0.4s;
        }
        .cta-primary-fill {
          position: absolute;
          inset: 0;
          background: ${GOLD};
          transform: translateY(101%);
          transition: transform 0.44s cubic-bezier(0.4,0,0.2,1);
        }
        .cta-primary:hover .cta-primary-fill { transform: translateY(0); }
        .cta-primary-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* ── CTA ghost ── */
        .cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${INK};
          text-decoration: none;
          border-bottom: 1px solid ${BORDER};
          padding-bottom: 3px;
          transition: color 0.28s, border-color 0.28s;
        }
        .cta-ghost:hover { color: ${GOLD}; border-color: ${GOLD}; }

        /* ── Stats ── */
        .stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.2vw, 2.8rem);
          font-weight: 700;
          color: ${INK};
          line-height: 1;
        }
        .stat-lbl {
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${MUTED};
          margin-top: 5px;
        }
        .stat-div {
          width: 1px;
          height: 38px;
          background: ${BORDER};
          align-self: center;
        }

        /* ── Floating tags ── */
        .float-tag {
          position: absolute;
          background: rgba(253,250,246,0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid ${BORDER};
          padding: 9px 16px;
          font-family: 'Jost', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${INK};
          white-space: nowrap;
          box-shadow: 0 6px 28px rgba(180,140,80,0.10), 0 1px 4px rgba(0,0,0,0.05);
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .tag-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: ${GOLD};
          flex-shrink: 0;
        }

        /* ── Right decorative circle ── */
        .deco-ring {
          position: absolute;
          right: 5%;
          top: 10%;
          width: clamp(220px, 28vw, 440px);
          height: clamp(220px, 28vw, 440px);
          border-radius: 50%;
          border: 1px solid rgba(184,146,74,0.18);
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .deco-ring::before {
          content: '';
          position: absolute;
          inset: 14px;
          border-radius: 50%;
          border: 1px dashed rgba(184,146,74,0.22);
        }
        .deco-ring-inner {
          width: 52%;
          height: 52%;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(240,228,208,0.9) 0%, rgba(228,210,178,0.85) 100%);
          backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          box-shadow: 0 8px 40px rgba(184,146,74,0.18), 0 1px 6px rgba(0,0,0,0.06);
        }
        .deco-ring-label-big {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.5rem, 2.8vw, 2.6rem);
          font-weight: 400;
          font-style: italic;
          color: ${GOLD};
          line-height: 1;
        }
        .deco-ring-label-sm {
          font-family: 'Jost', sans-serif;
          font-size: 0.55rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: ${MUTED};
        }

        /* ── Marquee ── */
        .marquee-outer {
          position: relative;
          z-index: 6;
          overflow: hidden;
          border-top: 1px solid ${BORDER};
          border-bottom: 1px solid ${BORDER};
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(8px);
        }
        .marquee-inner {
          display: flex;
          align-items: center;
          padding: 14px 0;
          white-space: nowrap;
          width: max-content;
          animation: marquee-scroll 32s linear infinite;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-item {
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: ${MUTED};
          padding: 0 4px;
          flex-shrink: 0;
        }
        .marquee-sep {
          color: ${GOLD};
          margin: 0 22px;
          font-size: 0.42rem;
          flex-shrink: 0;
        }

        /* ── Bottom bar ── */
        .btm-bar {
          position: relative;
          z-index: 6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 5%;
          border-top: 1px solid ${BORDER};
          background: rgba(253,250,246,0.92);
          backdrop-filter: blur(8px);
          flex-wrap: wrap;
          gap: 8px;
        }
        .social-link {
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${MUTED};
          text-decoration: none;
          transition: color 0.24s;
        }
        .social-link:hover { color: ${GOLD}; }

        /* ── Avail badge ── */
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.85)} }
        .avail-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #5bbf8a;
          animation: pulse-dot 2.4s ease infinite;
          flex-shrink: 0;
        }

        /* ── Arrow icon transition ── */
        .arrow-icon { transition: transform 0.28s ease; }
        .cta-primary:hover .arrow-icon { transform: translateX(4px); }
      `}</style>

      {/* ─────────────────── HERO ─────────────────── */}
      <div
        ref={heroRef}
        className="hero-wrap"
        onMouseMove={handleMouseMove}
      >

        {/* Background image with parallax */}
        <motion.div className="hero-bg-image" style={{ y: bgY }}>
          <img
            src={BG_IMAGE}
            alt="Creative studio background"
            loading="eager"
          />
        </motion.div>
        <div className="hero-bg-overlay" />
        <div className="hero-bg-overlay-right" />

        {/* ── Decorative ring (right) with mouse tilt ── */}
        <motion.div
          className="deco-ring"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 14, delay: 0.6 }}
          style={{ rotateX: springY, rotateY: springX }}
        >
          <div className="deco-ring-inner">
            <span className="deco-ring-label-big">F·S</span>
            <span className="deco-ring-label-sm">Studio</span>
          </div>
        </motion.div>

        {/* ── Floating brand tags ── */}
        {TAGS.map((tag) => (
          <motion.div
            key={tag.label}
            className="float-tag"
            style={{ top: tag.top, right: tag.right }}
            initial={{ opacity: 0, scale: 0.75, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 130, damping: 14, delay: tag.delay }}
          >
            <span className="tag-dot" />
            {tag.label}
          </motion.div>
        ))}

        {/* ── Main content ── */}
        <div className="hero-content">

          {/* Top row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(24px,3.5vh,44px)" }}>
            {/* Eyebrow */}
            <motion.div
              className="eyebrow"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            >
              <span className="eyebrow-rule" />
              World-Class Branding Studio
            </motion.div>

            {/* Availability */}
            <motion.div
              style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <span className="avail-dot" />
              Available 2025
            </motion.div>
          </div>

          {/* ── Giant headline with char animations ── */}
          <motion.div
            style={{ y: headlineY, opacity: headlineOpacity }}
          >
            <motion.h1
              className="headline"
              initial="hidden"
              animate="show"
            >
              {/* Line 1 */}
              <div style={{ display: "block", overflow: "hidden" }}>
                <AnimatedWord word="We " startDelay={0} />
                <AnimatedWord word="shape" startDelay={3} />
              </div>
              {/* Line 2 */}
              <div style={{ display: "block", overflow: "hidden", marginTop: "0.05em" }}>
                <span className="headline-outline">
                  <AnimatedWord word="brands " startDelay={8} />
                </span>
                <AnimatedWord word="that" startDelay={15} />
              </div>
              {/* Line 3 */}
              <div style={{ display: "block", overflow: "hidden", marginTop: "0.05em" }}>
                <span className="headline-italic">
                  <AnimatedWord word="define " startDelay={19} />
                </span>
                <AnimatedWord word="culture." startDelay={25} />
              </div>
            </motion.h1>
          </motion.div>

          {/* Gold rule */}
          <motion.div
            className="gold-rule"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          />

          {/* Sub + CTA + Stats row */}
          <div style={{ display: "flex", gap: "clamp(28px,5vw,80px)", alignItems: "flex-end", flexWrap: "wrap", paddingBottom: "clamp(24px,4vh,48px)" }}>

            {/* Left column */}
            <div style={{ flex: "1 1 300px", maxWidth: 400 }}>
              <motion.p
                className="sub-text"
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.75}
              >
                From challenger startups to Fortune 500 giants — we craft identities that don't just look good, they make people feel something irreplaceable.
              </motion.p>

              <motion.div
                style={{ display: "flex", alignItems: "center", gap: 20, marginTop: "clamp(22px,3vh,34px)", flexWrap: "wrap" }}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.9}
              >
                <a href="#work" className="cta-primary">
                  <div className="cta-primary-fill" />
                  <div className="cta-primary-content">
                    <span>See Our Work</span>
                    <svg className="arrow-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 7H13M7 1L13 7L7 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
                <a href="#studio" className="cta-ghost">
                  <span>Our Studio</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                  </svg>
                </a>
              </motion.div>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(14px,2.5vw,36px)", flexWrap: "wrap" }}>
              {STATS.map((stat, i) => (
                <div key={stat.label} style={{ display: "flex", alignItems: "flex-start", gap: "clamp(14px,2.5vw,36px)" }}>
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    custom={1.0 + i * 0.1}
                  >
                    <div className="stat-val">{stat.value}</div>
                    <div className="stat-lbl">{stat.label}</div>
                  </motion.div>
                  {i < STATS.length - 1 && (
                    <motion.div
                      className="stat-div"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 1.1 + i * 0.1, duration: 0.5 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Marquee strip ── */}
        <motion.div
          className="marquee-outer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <div className="marquee-inner">
            {MARQUEE_ITEMS.map((item, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
                <span className="marquee-item">{item}</span>
                <span className="marquee-sep">◆</span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Bottom bar ── */}
        <motion.div
          className="btm-bar"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ display: "flex", gap: 20 }}>
            {["Instagram", "Behance", "Dribbble"].map((s) => (
              <a key={s} href="#" className="social-link">{s}</a>
            ))}
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "0.9rem", color: MUTED }}>
            Est. 2013
          </div>
          <div style={{ fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED }}>
            hello@formestudio.co
          </div>
        </motion.div>

      </div>
    </>
  );
}