import React, { useState, useEffect, useRef } from 'react'

// Images
import aboutHero from '../assets/per.png'
import teamImage from '../assets/dani.jpg'
import erpImage from '../assets/school.png'
import hmsImage from '../assets/hospital.png'
import bmsImage from '../assets/bes.png'
import Footer from '../components/Footer'
import { useTheme } from '../hooks/useTheme'

/* ============================================================
   SCROLL-REVEAL COMPONENT (inline)
   ============================================================ */
function Reveal({ children, direction = 'up', delay = 0, className = '', as: Tag = 'div' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`reveal reveal-${direction} ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}

const expertise = [
  {
    img: erpImage,
    title: 'School ERP Systems',
    subtitle: 'Education Management Software',
    desc: 'We build complete school ERP platforms that handle admissions, student records, attendance, fee management, exams, results, timetables, and parent communication in one secure system. Designed for schools, colleges, and training centers — with role-based access for admins, teachers, students, and parents.',
    points: ['Admissions & student profiles', 'Fees, invoices & receipts', 'Attendance & timetables', 'Exams, grading & report cards', 'Parent & teacher portals'],
  },
  {
    img: hmsImage,
    title: 'Hospital Management Systems (HMS)',
    subtitle: 'Healthcare Software',
    desc: 'Our HMS software helps clinics and hospitals run smoothly — from patient registration and appointments to prescriptions, lab reports, billing, and pharmacy inventory. Everything is connected so doctors and staff spend less time on paperwork and more time on care.',
    points: ['Patient registration & records', 'Appointments & scheduling', 'Prescriptions & lab reports', 'Billing & insurance', 'Pharmacy & inventory'],
  },
  {
    img: bmsImage,
    title: 'Business Management Systems (BMS)',
    subtitle: 'Enterprise Software',
    desc: 'We create BMS platforms for small and growing businesses to manage sales, inventory, purchases, customers, suppliers, employees, and reports. A single dashboard gives owners real-time visibility into how the business is performing.',
    points: ['Sales & invoicing', 'Inventory & stock control', 'Purchases & suppliers', 'Employee & payroll basics', 'Reports & analytics'],
  },
] 
// this name if then for your school you want more explaore for your bessness and get somthing new want from our website platform and get more think and then you want then get this name it then name id then let 

const ecommerce = {
  title: 'E-commerce Software & Websites',
  desc: 'We design and develop complete online stores — from product catalogs and secure checkout to order tracking, delivery integration, and admin dashboards. Whether you sell physical products or digital services, we build a fast, mobile-friendly store that converts visitors into customers.',
  points: ['Product catalog & search', 'Cart & secure checkout', 'Payment gateway integration', 'Order tracking & delivery', 'Admin dashboard & analytics'],
}

const values = [
  { title: 'Quality First', desc: 'We write clean, tested code and never cut corners on things that matter.' },
  { title: 'Honest Communication', desc: 'Clear timelines, transparent pricing, and regular updates — no surprises.' },
  { title: 'Built to Scale', desc: 'Our systems are designed to grow with your school, hospital, or business.' },
  { title: 'Real Support', desc: 'We stay with you after launch with training, fixes, and improvements.' },
]

const timeline = [
  { year: '2020', title: 'DanTech founded', desc: 'Started as a small team building custom websites and web apps.' },
  { year: '2021', title: 'First School ERP', desc: 'Delivered our first full school management system to a local school.' },
  { year: '2022', title: 'Healthcare & Business', desc: 'Expanded into HMS and BMS software for clinics and businesses.' },
  { year: '2023', title: 'E-commerce growth', desc: 'Launched multiple online stores and integrated payment systems.' },
  { year: '2024', title: '10+ projects', desc: 'Reached over 50 delivered projects across schools, clinics, and shops.' },
]

export default function About() {
  const dark = useTheme()

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
  const shadowGold = dark ? 'shadow-[#D4AF37]/10' : 'shadow-gray-200'

  return (
    <>
      <main className={`min-h-screen transition-colors ${page}`}>

        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden">
          <div className={`pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl ${dark ? 'bg-[#D4AF37]/20' : 'bg-[#D4AF37]/10'}`} />

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
            <div>
              <Reveal direction="right" delay={0}>
                <span className={`inline-block rounded-full border border-[#D4AF37]/40 px-4 py-1.5 text-xs font-semibold tracking-wider ${gold}`}>
                  ABOUT DANTECH
                </span>
              </Reveal>
              <Reveal direction="right" delay={150}>
                <h1 className={`mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl ${heading}`}>
                  A software company that <span className={gold}>builds for real life</span>.
                </h1>
              </Reveal>
              <Reveal direction="right" delay={300}>
                <p className={`mt-6 max-w-xl text-base leading-relaxed sm:text-lg ${body}`}>
                  DanTech is a software development company specializing in management systems and websites for schools, hospitals, businesses, and online stores. We turn complex operations into simple, reliable software that people actually enjoy using.
                </p>
              </Reveal>
              <Reveal direction="right" delay={450}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="/contact"
                    className="rounded-lg bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black shadow-md shadow-[#D4AF37]/30 transition hover:-translate-y-0.5 hover:bg-[#F5D76E] hover:shadow-lg"
                  >
                    Work with us
                  </a>
                  <a
                    href="/"
                    className={`rounded-lg border px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${dark ? 'border-[#D4AF37]/50 text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10' : 'border-[#8a6d1f]/50 text-[#8a6d1f] hover:border-[#8a6d1f] hover:bg-[#D4AF37]/10'}`}
                  >
                    See our work
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal direction="left" delay={200} className="relative">
              <div className={`absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-2xl border ${cardBorder}`} />
              <img
                src={aboutHero}
                alt="DanTech office"
                className={`relative w-full rounded-2xl border object-cover shadow-2xl ${cardBorder} ${shadowGold}`}
              />
            </Reveal>
          </div>
        </section>

        {/* ============ WHO WE ARE ============ */}
        <section className={`border-y ${border} ${sectionAlt}`}>
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
            <Reveal direction="left" delay={0} className="relative">
              <img
                src={teamImage}
                alt="The DanTech team"
                className={`w-full rounded-2xl border object-cover shadow-xl ${cardBorder} ${shadowGold}`}
              />
              <div className={`animate-float absolute -bottom-6 -right-6 hidden rounded-2xl border px-6 py-4 shadow-lg sm:block ${cardBorder} ${cardBg}`}>
                <div className={`text-2xl font-extrabold ${gold}`}>50+</div>
                <div className={`text-xs uppercase tracking-wider ${muted}`}>Projects delivered</div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={150}>
              <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${heading}`}>
                Who we <span className={gold}>are</span>
              </h2>
              <p className={`mt-4 leading-relaxed ${body}`}>
                DanTech is a team of software developers, designers, and problem solvers. We started with a simple belief: businesses, schools, and hospitals deserve software that is powerful but easy to use — not bloated, confusing, or overpriced.
              </p>
              <p className={`mt-4 leading-relaxed ${body}`}>
                Today we build complete systems and websites for clients who need real results. From a school that wants to manage thousands of students to a hospital tracking patients every day, or a shop selling online — we design software around how people actually work.
              </p>
              <p className={`mt-4 leading-relaxed ${body}`}>
                We handle the full journey: understanding your needs, designing the interface, developing the system, testing it carefully, launching it, and supporting you long after go-live.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ WHAT WE BUILD ============ */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${heading}`}>
                Software we <span className={gold}>build</span>
              </h2>
              <p className={`mt-4 ${body}`}>
                Management systems and platforms for education, healthcare, business, and online commerce — each tailored to your needs.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 space-y-16">
            {expertise.map((item, i) => (
              <div
                key={item.title}
                className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                <Reveal direction={i % 2 === 0 ? 'left' : 'right'} delay={0} className="relative">
                  <div className={`absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-2xl border ${cardBorder}`} />
                  <img
                    src={item.img}
                    alt={item.title}
                    className={`w-full rounded-2xl border object-cover shadow-xl ${cardBorder} ${shadowGold}`}
                  />
                </Reveal>

                <Reveal direction={i % 2 === 0 ? 'right' : 'left'} delay={150}>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${goldSoft}`}>
                    {item.subtitle}
                  </span>
                  <h3 className={`mt-2 text-2xl font-bold sm:text-3xl ${gold}`}>
                    {item.title}
                  </h3>
                  <p className={`mt-4 leading-relaxed ${body}`}>{item.desc}</p>
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {item.points.map((p, j) => (
                      <Reveal key={p} direction="right" delay={300 + j * 80}>
                        <li className={`flex items-start gap-2.5 text-sm ${body}`}>
                          <svg className={`mt-0.5 h-4 w-4 shrink-0 ${gold}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {p}
                        </li>
                      </Reveal>
                    ))}
                  </ul>
                </Reveal>
              </div>
            ))}
          </div>

          {/* E-commerce block */}
          <Reveal direction="zoom" delay={0}>
            <div className={`mt-16 rounded-3xl border p-8 sm:p-12 ${cardBorder} ${sectionAlt}`}>
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${goldSoft}`}>Online Stores</span>
                  <h3 className={`mt-2 text-2xl font-bold sm:text-3xl ${gold}`}>{ecommerce.title}</h3>
                  <p className={`mt-4 leading-relaxed ${body}`}>{ecommerce.desc}</p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {ecommerce.points.map((p, j) => (
                    <Reveal key={p} direction={j % 2 === 0 ? 'left' : 'right'} delay={j * 100}>
                      <li className={`flex items-start gap-2.5 rounded-xl border p-3 text-sm ${cardBorder} ${cardBg} ${body}`}>
                        <svg className={`mt-0.5 h-4 w-4 shrink-0 ${gold}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {p}
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============ MISSION & VALUES ============ */}
        <section className={`border-t ${border} ${sectionAlt} py-20`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal direction="down">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${heading}`}>
                  Our mission
                </h2>
                <p className={`mt-4 text-lg leading-relaxed ${body}`}>
                  To help schools, hospitals, and businesses run better with software that is reliable, affordable, and genuinely easy to use — and to support our clients long after launch.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <Reveal key={v.title} direction="rotate" delay={i * 120}>
                  <div className={`h-full rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:shadow-xl ${cardBg} ${cardBorder} ${shadowGold}`}>
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/40 transition group-hover:scale-110 ${gold}`}>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className={`mt-4 text-lg font-semibold ${gold}`}>{v.title}</h3>
                    <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{v.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ TIMELINE ============ */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${heading}`}>
                Our <span className={gold}>journey</span>
              </h2>
              <p className={`mt-4 ${body}`}>From a small team to a trusted software partner.</p>
            </div>
          </Reveal>

          <div className="mt-12 space-y-6">
            {timeline.map((t, i) => (
              <Reveal key={t.year} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 100}>
                <div className={`flex flex-col gap-4 rounded-2xl border p-6 sm:flex-row sm:items-center transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/60 ${cardBorder} ${sectionAlt}`}>
                  <div className={`text-2xl font-extrabold sm:w-24 ${gold}`}>{t.year}</div>
                  <div className={`sm:border-l sm:border-[#D4AF37]/30 sm:pl-6`}>
                    <h3 className={`text-lg font-semibold ${heading}`}>{t.title}</h3>
                    <p className={`mt-1 text-sm ${muted}`}>{t.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <Reveal direction="zoom">
            <div className={`relative overflow-hidden rounded-3xl border px-6 py-14 text-center sm:px-12 ${cardBorder} ${sectionAlt}`}>
              <div className={`pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl ${dark ? 'bg-[#D4AF37]/20' : 'bg-[#D4AF37]/10'}`} />
              <h2 className={`relative text-3xl font-bold tracking-tight sm:text-4xl ${heading}`}>
                Have a project in <span className={gold}>mind</span>?
              </h2>
              <p className={`relative mx-auto mt-4 max-w-xl ${body}`}>
                Whether you need a school ERP, an HMS, a BMS, or an online store — DanTech can build it. Let's talk about your needs.
              </p>
              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="/contact"
                  className="rounded-lg bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black shadow-md shadow-[#D4AF37]/30 transition hover:-translate-y-0.5 hover:bg-[#F5D76E]"
                >
                  Contact us
                </a>
                <a
                  href="/"
                  className={`rounded-lg border px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${dark ? 'border-[#D4AF37]/60 text-[#F5D76E] hover:bg-[#D4AF37]/10' : 'border-[#8a6d1f]/60 text-[#8a6d1f] hover:bg-[#D4AF37]/10'}`}
                >
                  Back to home
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  )
}