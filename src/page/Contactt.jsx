import React, { useState } from 'react'

// Replace with your own image in src/assets/
import contactImage from '../assets/dan1.png'
import Footer from '../components/Footer'
import { useTheme } from '../hooks/useTheme'

const BaseUrl = 'http://localhost:5000'

const contactInfo = [
  {
    label: 'Email',
    value: 'danid93575@gmail.com',
    href: 'mailto:danid93575@gmail.com',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+2519 2122 5887',
    href: 'tel:+251921225887',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L7.9 9.6a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6A2 2 0 0122 16.9z" />
      </svg>
    ),
  },
  {
    label: 'Address',
    value: '123 Tech Street, Addis Ababa',
    href: 'https://maps.google.com',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    label: 'Hours',
    value: 'Mon–Fri, 9:00 – 18:00',
    href: null,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
      </svg>
    ),
  },
]

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'A simple website takes 2–4 weeks. School ERP, HMS, or BMS systems usually take 6–12 weeks depending on features. We give you a clear timeline before we start.',
  },
  {
    q: 'Do you customize systems for our needs?',
    a: 'Yes — everything we build is tailored. We adapt our school ERP, HMS, and BMS platforms to fit your exact workflows, users, and reports.',
  },
  {
    q: 'Do you provide support after launch?',
    a: 'Absolutely. We offer ongoing support, bug fixes, training, and updates. You are never left on your own after go-live.',
  },
  {
    q: 'Can you build an online store for my business?',
    a: 'Yes. We build complete e-commerce websites with product catalogs, cart, secure checkout, payment integration, and admin dashboards.',
  },
]

export default function Contact() {
  const dark = useTheme()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${BaseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to send message')

      console.log('Contact submitted:', data)
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSent(false), 5000)
    } catch (error) {
      console.error('Error sending contact form:', error)
      alert(error.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  /* ---------- theme-aware classes ---------- */
  const page = dark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
  const sectionAlt = dark ? 'bg-[#0a0a0a]' : 'bg-white'
  const border = dark ? 'border-[#D4AF37]/20' : 'border-[#D4AF37]/30'
  const heading = dark ? 'text-white' : 'text-gray-900'
  const body = dark ? 'text-gray-300' : 'text-gray-700'
  const muted = dark ? 'text-gray-400' : 'text-gray-500'
  const gold = dark ? 'text-[#F5D76E]' : 'text-[#8a6d1f]'
  const goldSoft = dark ? 'text-[#D4AF37]/70' : 'text-[#8a6d1f]/80'
  const cardBg = dark ? 'bg-black' : 'bg-white'
  const cardBorder = dark ? 'border-[#D4AF37]/25' : 'border-[#D4AF37]/30'
  const inputClass = dark
    ? 'border-[#D4AF37]/30 bg-[#0a0a0a] text-white placeholder-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]/30'
    : 'border-[#D4AF37]/40 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]/30'

  return (
    <>
      <main className={`min-h-screen transition-colors ${page}`}>

        {/* ============ HERO ============ */}
        <section className="relative w-full overflow-hidden">
          <img
            src={contactImage}
            alt="Contact DanTech"
            className="h-[50vh] min-h-[360px] w-full object-cover sm:h-[60vh]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
              <span className="inline-block w-fit rounded-full border border-[#D4AF37]/50 bg-black/40 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#F5D76E] backdrop-blur-sm">
                GET IN TOUCH
              </span>
              <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Let's talk about your <span className="text-[#F5D76E]">project</span>.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-200 sm:text-lg">
                Have a question or a project in mind? Send us a message and our team will get back to you within 24 hours.
              </p>
            </div>
          </div>
        </section>

        {/* ============ CONTACT INFO CARDS ============ */}
        <section className={`border-y ${border} ${sectionAlt}`}>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {contactInfo.map((c) => {
              const inner = (
                <div className={`group h-full rounded-2xl border p-6 transition hover:border-[#D4AF37]/60 hover:shadow-lg ${cardBg} ${cardBorder} ${dark ? 'hover:shadow-[#D4AF37]/10' : 'hover:shadow-gray-200'}`}>
                  <div className={`inline-flex rounded-xl border border-[#D4AF37]/40 p-3 transition group-hover:bg-[#D4AF37]/10 ${gold}`}>
                    {c.icon}
                  </div>
                  <div className={`mt-4 text-xs font-semibold uppercase tracking-wider ${goldSoft}`}>
                    {c.label}
                  </div>
                  <div className={`mt-1 break-words text-sm font-medium ${dark ? 'text-gray-200' : 'text-gray-700'}`}>
                    {c.value}
                  </div>
                </div>
              )
              return c.href ? (
                <a key={c.label} href={c.href} className="block h-full">
                  {inner}
                </a>
              ) : (
                <div key={c.label}>{inner}</div>
              )
            })}
          </div>
        </section>

        {/* ============ FORM + SIDE INFO ============ */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${heading}`}>
                Send us a <span className={gold}>message</span>
              </h2>
              <p className={`mt-3 ${body}`}>
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {sent && (
                <div className={`mt-6 flex items-center gap-3 rounded-xl border border-[#D4AF37]/40 px-4 py-3 text-sm ${gold} ${dark ? 'bg-[#D4AF37]/10' : 'bg-[#D4AF37]/5'}`}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Thanks! Your message has been sent. We'll reply soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium ${body}`}>Full name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${inputClass}`}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium ${body}`}>Email address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${inputClass}`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className={`block text-sm font-medium ${body}`}>Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="School ERP / HMS / BMS / E-commerce / Website"
                    className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${inputClass}`}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm font-medium ${body}`}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className={`mt-2 w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${inputClass}`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black shadow-md shadow-[#D4AF37]/30 transition hover:bg-[#F5D76E] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
                        <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                      Send message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Side panel */}
            <aside className="lg:col-span-2">
              <div className={`rounded-2xl border p-8 ${cardBg} ${cardBorder}`}>
                <h3 className={`text-xl font-bold ${gold}`}>Why contact us?</h3>
                <p className={`mt-3 text-sm leading-relaxed ${body}`}>
                  Whether you need a school ERP, hospital management system, business system, or an online store — we're ready to help you plan, build, and launch it.
                </p>

                <ul className="mt-6 space-y-3">
                  {[
                    'Free project consultation',
                    'Clear timelines & pricing',
                    'Dedicated team for your project',
                    'Ongoing support after launch',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg className={`mt-0.5 h-5 w-5 shrink-0 ${gold}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-sm ${body}`}>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className={`mt-8 border-t pt-6 ${border}`}>
                  <div className={`text-xs font-semibold uppercase tracking-wider ${goldSoft}`}>Prefer email?</div>
                  <a href="mailto:danid93575@gmail.com" className={`mt-1 inline-block text-sm font-medium hover:underline ${gold}`}>
                    danid93575@gmail.com
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className={`border-t ${border} ${sectionAlt} py-20`}>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${heading}`}>
                Frequently asked <span className={gold}>questions</span>
              </h2>
              <p className={`mt-4 ${body}`}>Quick answers to common questions before you reach out.</p>
            </div>

            <div className="mt-10 space-y-3">
              {faqs.map((f, i) => (
                <div key={f.q} className={`rounded-xl border ${cardBg} ${cardBorder}`}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className={`text-sm font-semibold sm:text-base ${heading}`}>{f.q}</span>
                    <svg
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${gold} ${openFaq === i ? 'rotate-45' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden px-5 transition-all duration-300 ${
                      openFaq === i ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className={`text-sm leading-relaxed ${muted}`}>{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className={`relative overflow-hidden rounded-3xl border px-6 py-14 text-center sm:px-12 ${cardBorder} ${sectionAlt}`}>
            <div className={`pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl ${dark ? 'bg-[#D4AF37]/20' : 'bg-[#D4AF37]/10'}`} />
            <h2 className={`relative text-3xl font-bold tracking-tight sm:text-4xl ${heading}`}>
              Ready to get <span className={gold}>started</span>?
            </h2>
            <p className={`relative mx-auto mt-4 max-w-xl ${body}`}>
              Let's turn your idea into a product your users love. Get in touch with DanTech today.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="/"
                className={`rounded-lg border px-6 py-3 text-sm font-semibold transition ${dark ? 'border-[#D4AF37]/60 text-[#F5D76E] hover:bg-[#D4AF37]/10' : 'border-[#8a6d1f]/60 text-[#8a6d1f] hover:bg-[#D4AF37]/10'}`}
              >
                Back to home
              </a>
              <a
                href="/login"
                className="rounded-lg bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black shadow-md shadow-[#D4AF37]/30 transition hover:bg-[#F5D76E]"
              >
                Sign in
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}