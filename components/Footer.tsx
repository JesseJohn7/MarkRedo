"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
          --light-bg: #faf9f7;
          --border: #e4ead8;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .footer {
          font-family: 'Nunito Sans', sans-serif;
          background: var(--light-bg);
          border-top: 1px solid var(--border);
          color: var(--text);
        }

        /* Footer Content */
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 40px 60px;
        }

        @media (max-width: 768px) {
          .footer-content {
            padding: 60px 24px 50px;
          }
        }

        /* Grid Layout */
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 48px;
          margin-bottom: 60px;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        /* Footer Section */
        .footer-section h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 20px;
          color: var(--text);
        }

        .footer-section p {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--muted);
          margin-bottom: 16px;
        }

        .footer-links {
          list-style: none;
        }

        .footer-links li {
          margin-bottom: 12px;
        }

        .footer-links a {
          font-size: 0.95rem;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-links a:hover {
          color: var(--green);
        }

        /* Contact Info */
        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .contact-item {
          font-size: 0.95rem;
          color: var(--muted);
          line-height: 1.6;
        }

        .contact-item a {
          color: var(--muted);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .contact-item a:hover {
          color: var(--green);
        }

        /* Social Links */
        .social-links {
          display: flex;
          gap: 16px;
          margin-top: 20px;
        }

        .social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid var(--border);
          color: var(--text);
          text-decoration: none;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: var(--green);
          border-color: var(--green);
          color: var(--text);
        }

        /* Bottom Bar */
        .footer-bottom {
          border-top: 1px solid var(--border);
          padding-top: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        @media (max-width: 640px) {
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }

        .footer-copyright {
          font-size: 0.9rem;
          color: var(--muted);
        }

        .footer-legal {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        @media (max-width: 640px) {
          .footer-legal {
            justify-content: center;
          }
        }

        .footer-legal a {
          font-size: 0.9rem;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-legal a:hover {
          color: var(--green);
        }

        /* Brand Logo Area */
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text);
        }

        .footer-brand-tagline {
          font-size: 0.85rem;
          color: var(--muted);
          max-width: 280px;
        }
      `}</style>

      <footer className="footer">
        {/* Main Content */}
        <div className="footer-content">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-section footer-brand">
              <div className="footer-brand-name">MarkBrand</div>
              <p className="footer-brand-tagline">
                Building brands that define generations across multiple industries.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" title="Facebook">
                  f
                </a>
                <a href="#" className="social-link" title="Twitter">
                  𝕏
                </a>
                <a href="#" className="social-link" title="Instagram">
                  📷
                </a>
                <a href="#" className="social-link" title="LinkedIn">
                  in
                </a>
              </div>
            </div>

            {/* Company */}
            <div className="footer-section">
              <h3>Company</h3>
              <ul className="footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">Our Story</Link></li>
                <li><Link href="/team">Our Team</Link></li>
                <li><Link href="#services">Services</Link></li>
                <li><Link href="/gallery">Gallery</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h3>Services</h3>
              <ul className="footer-links">
                <li><a href="#services">Commercial Printing</a></li>
                <li><a href="#services">Creative Branding</a></li>
                <li><a href="#services">Photography</a></li>
                <li><a href="#services">Media Production</a></li>
                <li><a href="#services">Fashion & Tailoring</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-section">
              <h3>Contact</h3>
              <div className="footer-contact">
                <div className="contact-item">
                  📍 Lagos, Nigeria
                </div>
                <div className="contact-item">
                  📧 <a href="mailto:info@markbrand.com">info@markbrand.com</a>
                </div>
                <div className="contact-item">
                  📱 <a href="tel:+2341234567890">+234 (0) 123 456 7890</a>
                </div>
                <div className="contact-item">
                  🕐 Mon - Fri: 9AM - 6PM
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <div className="footer-copyright">
              © {currentYear} MarkBrand. All rights reserved.
            </div>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
