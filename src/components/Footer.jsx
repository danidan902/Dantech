import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

export default function Footer() {
  const dark = useTheme()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    console.log('Subscribe:', email)
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 4000)
  }

  const year = new Date().getFullYear()

  /* ---------- theme-aware classes ---------- */
  const shell = dark ? 'bg-black text-white border-[#D4AF37]/20' : 'bg-white text-gray-900 border-[#D4AF37]/30'
  const heading = dark ? 'text-[#F5D76E]' : 'text-[#8a6d1f]'
  const body = dark ? 'text-gray-400' : 'text-gray-600'
  const linkClass = dark ? 'text-gray-400 hover:text-[#F5D76E]' : 'text-gray-600 hover:text-[#8a6d1f]'
  const gold = dark ? 'text-[#D4AF37]' : 'text-[#8a6d1f]'
  const goldHover = dark ? 'hover:text-[#F5D76E]' : 'hover:text-[#8a6d1f]'
  const socialBorder = dark ? 'border-[#D4AF37]/30 text-[#D4AF37]' : 'border-[#8a6d1f]/40 text-[#8a6d1f]'
  const socialHover = 'hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#F5D76E]'
  const inputClass = dark
    ? 'border-[#D4AF37]/30 bg-[#0a0a0a] text-white placeholder-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]/30'
    : 'border-[#D4AF37]/40 bg-white text-gray-900 placeholder-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]/30'
  const labelColor = dark ? 'text-gray-500' : 'text-gray-600'
  const footerBottomBorder = dark ? 'border-[#D4AF37]/20' : 'border-[#D4AF37]/30'
  const copyrightMuted = dark ? 'text-gray-500' : 'text-gray-500'
  const copyrightStrong = dark ? 'text-gray-300' : 'text-gray-700'

  return (
    <footer className={`border-t transition-colors ${shell}`}>
      {/* ===== MAIN ===== */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#D4AF37] text-lg font-extrabold text-black">
                D
              </div>
              <span className={`text-xl font-bold tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
                Dan<span className={heading}>Tech</span>
              </span>
            </Link>

            <p className={`mt-4 text-sm leading-relaxed ${body}`}>
              We build school ERP, hospital management, business, and e-commerce
              software — designed to perform, built to last.
            </p>

            <div className="mt-5 flex items-center gap-2">
              {[
                {
                  label: 'Twitter / X',
                  href: 'https://twitter.com',
                  icon: (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  label: 'Facebook',
                  href: 'https://facebook.com',
                  icon: (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
                    </svg>
                  ),
                },
                {
                  label: 'LinkedIn',
                  href: 'https://linkedin.com',
                  icon: (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 11-.01-4.13 2.06 2.06 0 01.01 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                    </svg>
                  ),
                },
                {
                  label: 'GitHub',
                  href: 'https://github.com',
                  icon: (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.05 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05.8-.23 1.65-.34 2.5-.34.85 0 1.7.11 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.71 1.03 1.62 1.03 2.74 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.89 0 1.36-.01 2.46-.01 2.8 0 .27.18.6.69.49C19.14 20.62 22 16.78 22 12.25 22 6.58 17.52 2 12 2z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`grid h-9 w-9 place-items-center rounded-lg border transition ${socialBorder} ${socialHover}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${heading}`}>Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Contact', to: '/contact' },
                { label: 'Blog', to: '/blog' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={`transition ${linkClass}`}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${heading}`}>Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {['School ERP', 'Hospital Management', 'Business Systems', 'E-commerce Websites', 'Custom Software'].map((s) => (
                <li key={s}>
                  <Link to="/contact" className={`transition ${linkClass}`}>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + newsletter */}
          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${heading}`}>Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <svg className={`mt-0.5 h-4 w-4 shrink-0 ${gold}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" />
                </svg>
                <a href="mailto:danid93575@gmail.com" className={`transition ${body} ${goldHover}`}>
                  danid93575@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className={`mt-0.5 h-4 w-4 shrink-0 ${gold}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L7.9 9.6a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6A2 2 0 0122 16.9z" />
                </svg>
                <a href="tel:+251921225887" className={`transition ${body} ${goldHover}`}>
                  +251 921 225 887
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className={`mt-0.5 h-4 w-4 shrink-0 ${gold}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <span className={body}>Addis Ababa, Ethiopia</span>
              </li>
            </ul>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="mt-5">
              <label className={`block text-xs font-semibold uppercase tracking-wider ${labelColor}`}>
                Newsletter
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 ${inputClass}`}
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-lg bg-[#D4AF37] px-3 py-2 text-sm font-semibold text-black transition hover:bg-[#F5D76E]"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
              {subscribed && (
                <p className={`mt-2 text-xs ${dark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  Subscribed! Check your inbox.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className={`border-t ${footerBottomBorder}`}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p className={`text-xs ${copyrightMuted}`}>
            © {year} <span className={copyrightStrong}>DanTech Software Company</span>. All rights reserved.
          </p>
          <div className={`flex flex-wrap items-center justify-center gap-4 text-xs ${copyrightMuted}`}>
            <a href="/privacy" className={`transition ${goldHover}`}>Privacy</a>
            <a href="/terms" className={`transition ${goldHover}`}>Terms</a>
            <a href="/contact" className={`transition ${goldHover}`}>Support</a>
          </div>
        </div>
      </div>
    </footer>
  )
}