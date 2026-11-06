import React, { useState, useEffect, useRef } from 'react'

// Images
import heroImage from '../assets/dan1.png'
import heroImageMobile from '../assets/pic.png'
import aboutImage from '../assets/dani.jpg'
import project1 from '../assets/magic.png'
import project2 from '../assets/image.png'
import project3 from '../assets/eco1.png'
import project4 from '../assets/add.png'
import ctaImage from '../assets/add.png'
import Footer from '../components/Footer'

// Backend base URL (same as Admin.jsx)
const BaseUrl = 'http://localhost:5000'

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

/* ============================================================
   DATA
   ============================================================ */
const services = [
  {
    title: 'Web Development',
    desc: 'We build fast, responsive, and scalable web applications using React, Next.js, and modern backend stacks. Every product is optimized for performance, SEO, and long-term maintainability.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9-4 9 4-9 4-9-4zM3 12l9 4 9-4M3 17l9 4 9-4" />
      </svg>
    ),
  },  
  {
    title: 'Mobile Apps',
    desc: 'Native and cross-platform apps for iOS and Android that feel effortless. We handle everything from design to app-store release and ongoing updates.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <path strokeLinecap="round" d="M11 18h2" />
      </svg>
    ),
  },
  {
    title: 'UI/UX Design',
    desc: 'Beautiful, intuitive interfaces designed around real people. We research, prototype, and test until every interaction feels natural and delightful.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5L12 3z" />
      </svg>
    ),
  },
  {
    title: 'Cloud & DevOps',
    desc: 'Reliable infrastructure, automated CI/CD pipelines, and zero-downtime deployments. We keep your product online, secure, and scaling smoothly.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 18a4 4 0 01-.5-7.97A5.5 5.5 0 0117 9a3.5 3.5 0 010 7H7z" />
      </svg>
    ),
  },
  {
    title: 'AI & Automation',
    desc: 'Smart tools and automation that save time and unlock new value. From chatbots to data pipelines, we help you work smarter.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="7" width="14" height="12" rx="2" />
        <path strokeLinecap="round" d="M9 3v4M15 3v4M9 13h.01M15 13h.01" />
      </svg>
    ),
  },
  {
    title: 'Consulting',
    desc: 'Strategy and technical guidance to ship the right product, faster. We help you choose the right stack and avoid costly mistakes.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
      </svg>
    ),
  },
]

const stats = [
  { value: '10+', label: 'Projects Delivered' },
  { value: '20+', label: 'Happy Clients' },
  { value: '3+', label: 'Years Experience' },
  { value: '24/7', label: 'Support' },
]

// Fallback projects (shown if the API returns no posts)
const fallbackProjects = [
  { img: project1, title: 'FinTrack Dashboard', tag: 'Web App' },
  { img: project2, title: 'MediBook Mobile', tag: 'Mobile App' },
  { img: project3, title: 'ShopNest E-commerce', tag: 'Web App' },
  { img: project4, title: 'CloudSync Platform', tag: 'Cloud' },
]

const process = [
  { step: '01', title: 'Discover', desc: 'We learn your goals, users, and constraints through workshops and research.' },
  { step: '02', title: 'Design', desc: 'We craft wireframes and polished UI prototypes, iterating with your feedback.' },
  { step: '03', title: 'Build', desc: 'We develop with clean, tested code and ship in fast, reviewable increments.' },
  { step: '04', title: 'Launch & Support', desc: 'We deploy, monitor, and keep improving your product after launch.' },
]

/* ============================================================
   HOME
   ============================================================ */
export default function Home() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return true
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // ===== POSTS STATE =====
  const [posts, setPosts] = useState([])
  const [postsLoading, setPostsLoading] = useState(true)
  const [postsError, setPostsError] = useState('')

  useEffect(() => {
    const read = () => {
      const saved = localStorage.getItem('theme')
      setDark(saved ? saved === 'dark' : true)
    }
    read()
    window.addEventListener('storage', read)
    window.addEventListener('theme-change', read)
    return () => {
      window.removeEventListener('storage', read)
      window.removeEventListener('theme-change', read)
    }
  }, [])

  // ===== FETCH POSTS FROM BACKEND =====
  useEffect(() => {
    let cancelled = false

    const fetchPosts = async () => {
      setPostsLoading(true)
      setPostsError('')
      try {
        const response = await fetch(`${BaseUrl}/api/posts`)
        const data = await response.json().catch(() => ({}))

        if (!response.ok) {
          throw new Error(data.message || `Failed to load posts (${response.status})`)
        }

        // Backend returns { success, count, data: [...] }
        const rawList = Array.isArray(data) ? data : data.data || data.posts || []

        // Normalize: guarantee a string _id on each post
        const list = rawList
          .map((p) => {
            const id = String(p._id || p.id || '')
            return {
              _id: id,
              id,
              title: p.title || 'Untitled',
              description: p.description || '',
              image: p.image || '',
              tag: p.tag || 'Post',
              createdAt: p.createdAt || p.date || null,
            }
          })
          .filter((p) => p._id)

        if (!cancelled) setPosts(list)
      } catch (err) {
        if (!cancelled) setPostsError(err.message || 'Something went wrong')
      } finally {
        if (!cancelled) setPostsLoading(false)
      }
    }

    fetchPosts()
    return () => {
      cancelled = true
    }
  }, [])

  const page = dark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
  const sectionAlt = dark ? 'bg-[#0a0a0a]' : 'bg-white'
  const border = dark ? 'border-[#D4AF37]/20' : 'border-[#D4AF37]/30'
  const headingText = dark ? 'text-white' : 'text-gray-900'
  const bodyText = dark ? 'text-gray-300' : 'text-gray-700'
  const mutedText = dark ? 'text-gray-400' : 'text-gray-500'
  const gold = dark ? 'text-[#F5D76E]' : 'text-[#8a6d1f]'
  const cardBg = dark ? 'bg-black' : 'bg-white'
  const cardBorder = dark ? 'border-[#D4AF37]/25' : 'border-[#D4AF37]/30'

  // Use API posts if available, otherwise fall back to hardcoded projects
  const displayProjects = posts.length > 0 ? posts : fallbackProjects

  return (
    <>
      <main className={`min-h-screen transition-colors ${page}`}>

        {/* ============ HERO ============ */}
        <section className="relative w-full overflow-hidden">
          <img
            src={heroImageMobile}
            alt="DanTech team at work"
            className="h-[70vh] min-h-[480px] w-full object-cover sm:hidden"
          />
          <img
            src={heroImage}
            alt="DanTech team at work"
            className="hidden h-[70vh] min-h-[480px] w-full object-cover sm:block sm:h-[80vh]"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
              <Reveal direction="right" delay={0}>
                <span className="inline-block w-fit rounded-full border border-[#D4AF37]/50 bg-black/40 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#F5D76E] backdrop-blur-sm">
                  DANTECH SOFTWARE COMPANY
              {/* this name for this name of then but more think and get more think */}
                </span> 
              </Reveal>
              <Reveal direction="right" delay={150}>
                <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Building <span className="text-[#F5D76E]">software</span> that moves your business forward.
                </h1>
              </Reveal>
              <Reveal direction="right" delay={300}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-200 sm:text-lg">
                  DanTech crafts web, mobile, and cloud products with precision and care — designed to perform, built to last. From first sketch to final deploy, we partner with you at every step.
                </p>
              </Reveal>
              <Reveal direction="right" delay={450}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="/contact"
                    className="rounded-lg bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black shadow-md shadow-[#D4AF37]/30 transition hover:-translate-y-0.5 hover:bg-[#F5D76E] hover:shadow-lg"
                  >
                    Get started
                  </a>
                  <a
                    href="/blog"
                    className="rounded-lg border border-[#D4AF37]/60 bg-black/40 px-6 py-3 text-sm font-semibold text-[#F5D76E] backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-[#D4AF37]/20"
                  >
                    View our work
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ STATS — each zooms in ============ */}
        <section className={`border-y ${border} ${sectionAlt}`}>
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} direction="zoom" delay={i * 120}>
                <div className="text-center">
                  <div className={`text-3xl font-extrabold sm:text-4xl ${gold}`}>{s.value}</div>
                  <div className={`mt-1 text-xs font-medium uppercase tracking-wider sm:text-sm ${mutedText}`}>
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ WHO WE ARE — image from left, text from right ============ */}
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal direction="left" delay={0} className="relative order-2 lg:order-1">
            <img
              src={aboutImage}
              alt="The DanTech team"
              className={`w-full rounded-2xl border object-cover shadow-xl ${cardBorder} ${dark ? 'shadow-[#D4AF37]/10' : 'shadow-gray-200'}`}
            />
            <div className={`animate-float absolute -bottom-6 -right-6 hidden rounded-2xl border px-6 py-4 shadow-lg sm:block ${cardBorder} ${cardBg}`}>
              <div className={`text-2xl font-extrabold ${gold}`}>5+</div>
              <div className={`text-xs uppercase tracking-wider ${mutedText}`}>Years building</div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={150} className="order-1 lg:order-2">
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${headingText}`}>
              Who we <span className={gold}>are</span>
            </h2>
            <p className={`mt-4 leading-relaxed ${bodyText}`}>
              DanTech is a full-service software company built by engineers and designers who love shipping great products. We've helped startups and established businesses launch web apps, mobile apps, and cloud platforms used by thousands of people every day.
            </p>
            <p className={`mt-4 leading-relaxed ${bodyText}`}>
              We believe great software comes from close collaboration, honest communication, and a relentless focus on quality. No bloated teams, no jargon — just skilled people solving real problems with you.
            </p>
            <ul className="mt-6 space-y-3">
              {['A dedicated team for every project', 'Transparent timelines and pricing', 'Clean, tested, maintainable code'].map((item, i) => (
                <Reveal key={item} direction="right" delay={300 + i * 100}>
                  <li className="flex items-start gap-3">
                    <svg className={`mt-0.5 h-5 w-5 shrink-0 ${gold}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={bodyText}>{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ============ SERVICES — alternate directions ============ */}
        <section className={`border-t ${border} ${sectionAlt} py-20`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal direction="up">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${headingText}`}>
                  What we <span className={gold}>do</span>
                </h2>
                <p className={`mt-4 ${bodyText}`}>
                  End-to-end software services — from idea to launch and beyond.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => {
                const dirs = ['left', 'zoom', 'right', 'right', 'zoom', 'left']
                return (
                  <Reveal key={s.title} direction={dirs[i % dirs.length]} delay={i * 100}>
                    <div className={`group h-full rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:shadow-xl ${cardBg} ${cardBorder} ${dark ? 'hover:shadow-[#D4AF37]/20' : 'hover:shadow-gray-300'}`}>
                      <div className={`inline-flex rounded-xl border p-3 transition group-hover:scale-110 group-hover:bg-[#D4AF37]/10 ${dark ? 'border-[#D4AF37]/40' : 'border-[#8a6d1f]/40'} ${gold}`}>
                        {s.icon}
                      </div>
                      <h3 className={`mt-4 text-lg font-semibold ${gold}`}>{s.title}</h3>
                      <p className={`mt-2 text-sm leading-relaxed ${mutedText}`}>{s.desc}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============ PROJECTS — fetches real posts from backend ============ */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${headingText}`}>
                Recent <span className={gold}>work</span>
              </h2>
              <p className={`mt-4 ${bodyText}`}>
                {posts.length > 0
                  ? "A few of the latest projects we've published."
                  : "A few of the products we've designed and built for our clients."}
              </p>
            </div>
          </Reveal>

          {/* Loading skeletons */}
          {postsLoading && (
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`animate-pulse overflow-hidden rounded-2xl border ${cardBorder} ${cardBg}`}>
                  <div className={`aspect-video ${dark ? 'bg-white/5' : 'bg-gray-200'}`} />
                  <div className="space-y-2 p-5">
                    <div className={`h-4 w-2/3 rounded ${dark ? 'bg-white/10' : 'bg-gray-200'}`} />
                    <div className={`h-3 w-full rounded ${dark ? 'bg-white/5' : 'bg-gray-100'}`} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {!postsLoading && postsError && (
            <div className={`mt-8 rounded-lg border px-4 py-3 text-sm ${
              dark ? 'border-red-500/40 bg-red-500/10 text-red-300' : 'border-red-300 bg-red-50 text-red-700'
            }`}>
              Could not load posts: {postsError}
            </div>
          )}

          {/* Posts grid */}
          {!postsLoading && (
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {displayProjects.map((p, i) => {
                const title = p.title || 'Untitled'
                const image = p.image || p.img || ''
                const tag = p.tag || 'Post'
                const desc = p.description || 'Delivered with a focus on speed, usability, and clean design.'

                return (
                  <Reveal key={p._id || p.id || title + i} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 100}>
                    <div className={`group overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:shadow-xl ${cardBg} ${cardBorder} ${dark ? 'hover:shadow-[#D4AF37]/20' : 'hover:shadow-gray-300'}`}>
                      <div className="relative aspect-video overflow-hidden">
                        {image ? (
                          <img
                            src={image}
                            alt={title}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                        ) : (
                          <div className={`grid h-full w-full place-items-center ${dark ? 'bg-white/5 text-gray-600' : 'bg-gray-100 text-gray-400'}`}>
                            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.6-4.6a2 2 0 012.8 0L16 16m-2-2l1.6-1.6a2 2 0 012.8 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <span className="absolute left-4 top-4 rounded-full border border-[#D4AF37]/40 bg-black/70 px-3 py-1 text-xs font-medium text-[#F5D76E]">
                          {tag}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className={`text-lg font-semibold ${headingText}`}>{title}</h3>
                        <p className={`mt-1 line-clamp-2 text-sm ${mutedText}`}>{desc}</p>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          )}
        </section>

        {/* ============ PROCESS — rotate in ============ */}
        <section className={`border-t ${border} ${sectionAlt} py-20`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal direction="down">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${headingText}`}>
                  How we <span className={gold}>work</span>
                </h2>
                <p className={`mt-4 ${bodyText}`}>
                  A clear, proven process from first conversation to launch.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((p, i) => (
                <Reveal key={p.step} direction="rotate" delay={i * 120}>
                  <div className={`h-full rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/60 ${cardBg} ${cardBorder}`}>
                    <div className={`text-3xl font-extrabold ${dark ? 'text-[#D4AF37]/50' : 'text-[#8a6d1f]/40'}`}>
                      {p.step}
                    </div>
                    <h3 className={`mt-3 text-lg font-semibold ${gold}`}>{p.title}</h3>
                    <p className={`mt-2 text-sm leading-relaxed ${mutedText}`}>{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA — zoom in ============ */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal direction="zoom">
            <div className={`relative overflow-hidden rounded-3xl border border-[#D4AF37]/40 ${cardBg}`}>
              <img
                src={ctaImage}
                alt="DanTech office"
                className="absolute inset-0 h-full w-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-black/70" />
              <div className="relative px-6 py-16 text-center sm:px-12">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to build something <span className="text-[#F5D76E]">great</span>?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-gray-200">
                  Let's turn your idea into a product your users love. Get in touch with DanTech today.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <a
                    href="/contact"
                    className="rounded-lg bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black shadow-md shadow-[#D4AF37]/30 transition hover:-translate-y-0.5 hover:bg-[#F5D76E]"
                  >
                    Start a project
                  </a>
                  <a
                    href="/login"
                    className="rounded-lg border border-[#D4AF37]/60 px-6 py-3 text-sm font-semibold text-[#F5D76E] transition hover:-translate-y-0.5 hover:bg-[#D4AF37]/10"
                  >
                    Sign in
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

      </main>
      <Footer />
    </>
  )
}