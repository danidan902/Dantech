import React, { useState, useEffect, useRef } from 'react'

// Images
import featuredImage from '../assets/dan1.png'
import post1 from '../assets/hospital.png'
import post2 from '../assets/eco1.png'
import post3 from '../assets/bes.png'
import post4 from '../assets/add.png'
import post5 from '../assets/school.png'
import post6 from '../assets/magic.png'
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

const categories = ['All', 'School ERP', 'HMS', 'BMS', 'E-commerce', 'Web Development']

const articles = [
  {
    slug: 'school-erp-transforms-management',
    img: featuredImage,
    category: 'School ERP',
    title: 'How a Modern School ERP Transforms Daily School Management',
    excerpt:
      'From admissions and attendance to fees, exams, and parent communication — discover how an integrated school ERP system removes paperwork, saves staff hours, and gives administrators real-time visibility.',
    author: 'DanTech Team',
    date: 'Jan 12, 2025',
    readTime: '8 min read',
    featured: true,
    content: [
      { heading: 'Why schools outgrow paper and spreadsheets', paragraphs: ['Most schools start with registers, spreadsheets, and a handful of disconnected tools. It works — until student numbers grow, staff turnover increases, and parents expect instant answers. That is when hidden costs appear: duplicated data entry, lost fee receipts, delayed report cards, and hours spent chasing information.', 'A modern school ERP brings admissions, attendance, fees, exams, communication, and reporting into one connected system. Staff enter information once, and everyone who needs it can see it — securely and in real time.'] },
      { heading: 'Admissions and student records in one place', paragraphs: ['Instead of paper forms and scattered files, every student gets a digital profile from the moment they apply. Enrollment status, guardians, medical notes, documents, and academic history stay linked to that profile for years.', 'Administrators can search any student in seconds, generate class lists automatically, and hand over accurate records when a student transfers — no more digging through cabinets.'] },
      { heading: 'Attendance, timetables, and exams without chaos', paragraphs: ['Teachers mark attendance digitally, and the system instantly updates daily and monthly summaries. Timetables are built and changed without reprinting anything, and substitution gaps are visible to the right people immediately.', 'Exam setup, grading, and report card generation become a guided workflow. Marks are entered once, totals and rankings calculate automatically, and report cards are ready to print or share with parents online.'] },
      { heading: 'Fees, billing, and parent communication', paragraphs: ['Fee structures, invoices, receipts, and reminders are handled by the system, not by hand. Parents see what they owe, when it is due, and receive receipts instantly. Schools see collection status at a glance and follow up on overdue balances with one click.', 'The parent portal closes the loop: announcements, attendance alerts, grades, and fee statements appear in a single place. Fewer phone calls to the office, and more trust from families.'] },
      { heading: 'The bottom line', paragraphs: ['A good school ERP is not just software — it is a shift in how the school runs. Less paperwork, fewer errors, faster answers, and leadership that can make decisions from real data instead of guesswork.'] },
    ],
  },
  {
    slug: 'signs-clinic-needs-hms',
    img: post1,
    category: 'HMS',
    title: '5 Signs Your Clinic Needs a Hospital Management System',
    excerpt: 'Long queues, lost files, and billing errors are more than annoyances — they cost you patients. Here are the key signs it is time to upgrade to a proper HMS.',
    author: 'DanTech Team',
    date: 'Jan 8, 2025',
    readTime: '6 min read',
    content: [
      { heading: '1. Patients wait too long to be seen', paragraphs: ['If patients queue for registration, then queue again for billing, then wait for their file to be found, you are losing goodwill every single day. An HMS streamlines registration, scheduling, and billing so patients move through your clinic smoothly.'] },
      { heading: '2. Paper files go missing', paragraphs: ['Lost files mean repeated tests, wasted time, and risk to patient safety. Digital patient records are searchable in seconds, backed up automatically, and always available to the right staff.'] },
      { heading: '3. Billing errors are common', paragraphs: ['Manual billing creates mistakes that hurt both your revenue and your reputation. An HMS calculates charges, applies insurance rules, and generates clear invoices automatically.'] },
      { heading: '4. You cannot see how the clinic is performing', paragraphs: ['Without dashboards, you guess. With an HMS, you see daily patient counts, revenue, common diagnoses, and staff workload at a glance — so you can make informed decisions.'] },
      { heading: '5. Staff are overwhelmed by admin work', paragraphs: ['When skilled staff spend more time on paperwork than on patients, something is wrong. Automation frees your team to focus on care, which improves outcomes and morale.'] },
    ],
  },
  {
    slug: 'online-store-converts',
    img: post2,
    category: 'E-commerce',
    title: 'Building an Online Store That Actually Converts',
    excerpt: 'A beautiful website is not enough. Learn the checkout, product page, and speed optimizations that turn visitors into paying customers.',
    author: 'DanTech Team',
    date: 'Jan 3, 2025',
    readTime: '7 min read',
    content: [
      { heading: 'Speed is the first conversion feature', paragraphs: ['Every extra second of load time costs sales. Optimize images, use a fast host, and keep your store lean. A store that loads in under two seconds already beats most competitors.'] },
      { heading: 'Product pages that answer questions', paragraphs: ['High-quality photos, clear pricing, honest descriptions, and reviews remove doubt. The more confident a visitor feels, the more likely they are to buy.'] },
      { heading: 'A checkout with zero friction', paragraphs: ['Guest checkout, saved payment methods, clear shipping costs upfront, and a mobile-friendly design are non-negotiable. Every unnecessary field is a reason to abandon the cart.'] },
      { heading: 'Trust signals everywhere', paragraphs: ['Secure payment badges, return policies, and real contact information tell visitors you are a real business. Trust is what turns a first-time visitor into a repeat customer.'] },
      { heading: 'Measure, then improve', paragraphs: ['Track where visitors drop off. Test headlines, images, and checkout steps. Small improvements, repeated over time, compound into significant revenue growth.'] },
    ],
  },
  {
    slug: 'why-business-needs-bms',
    img: post3,
    category: 'BMS',
    title: 'Why Every Growing Business Needs a BMS in 2025',
    excerpt: 'Spreadsheets break as you grow. A business management system keeps sales, inventory, and reporting in one place — here is what to look for.',
    author: 'DanTech Team',
    date: 'Dec 28, 2024',
    readTime: '5 min read',
    content: [
      { heading: 'Spreadsheets do not scale', paragraphs: ['What worked for ten customers falls apart at a hundred. Duplicated files, version confusion, and manual reconciliation slow you down and invite costly mistakes.'] },
      { heading: 'One source of truth', paragraphs: ['A BMS unifies sales, inventory, purchases, customers, and reporting. Everyone works from the same data, so decisions are faster and more accurate.'] },
      { heading: 'Inventory you can actually trust', paragraphs: ['Real-time stock tracking prevents stockouts and overstock. Automatic reorder alerts and supplier records keep your shelves healthy without guesswork.'] },
      { heading: 'Reports that drive decisions', paragraphs: ['Daily sales, top products, slow movers, and profit margins should be a click away — not an afternoon of spreadsheet work.'] },
      { heading: 'What to look for in a BMS', paragraphs: ['Choose a system that fits your workflows, offers clear reporting, supports your growth, and comes with real support. Avoid tools that lock your data in or require costly add-ons for basics.'] },
    ],
  },
  {
    slug: 'react-vs-nextjs',
    img: post4,
    category: 'Web Development',
    title: 'React vs Next.js: Which Should You Use for Your Project?',
    excerpt: 'Both are powerful. We break down when to choose React, when to choose Next.js, and how the decision affects speed, SEO, and maintainability.',
    author: 'DanTech Team',
    date: 'Dec 20, 2024',
    readTime: '9 min read',
    content: [
      { heading: 'What React gives you', paragraphs: ['React is a flexible UI library. You choose your routing, data fetching, and build setup. That freedom is powerful for experienced teams but means more decisions up front.'] },
      { heading: 'What Next.js adds', paragraphs: ['Next.js builds on React with file-based routing, server-side rendering, static generation, image optimization, and API routes out of the box. It is ideal for content-heavy sites and SEO-sensitive apps.'] },
      { heading: 'SEO and performance', paragraphs: ['If search visibility and fast first paint matter, Next.js usually wins with its built-in rendering options. For internal dashboards or apps behind a login, plain React is often simpler.'] },
      { heading: 'When to choose React', paragraphs: ['Choose React when you want maximum control, are building an SPA, or have a team that prefers to assemble its own stack.'] },
      { heading: 'When to choose Next.js', paragraphs: ['Choose Next.js for marketing sites, blogs, e-commerce, or any product that benefits from SSR, SSG, and strong SEO defaults.'] },
      { heading: 'Our recommendation', paragraphs: ['For most client projects that need to be found on Google, we reach for Next.js. For complex internal apps, plain React stays lean and predictable.'] },
    ],
  },
  {
    slug: 'parent-portal-love',
    img: post5,
    category: 'School ERP',
    title: 'A Parent Portal Your School Community Will Love',
    excerpt: 'Parents want instant access to grades, fees, and announcements. Here is how a well-designed parent portal improves engagement and reduces calls to the office.',
    author: 'DanTech Team',
    date: 'Dec 14, 2024',
    readTime: '6 min read',
    content: [
      { heading: 'Parents expect instant answers', paragraphs: ['A parent portal gives families secure access to grades, attendance, fees, and announcements — anytime, from any device. The result: fewer phone calls and more trust.'] },
      { heading: 'Design for real parents', paragraphs: ['Use plain language, large touch targets, and a mobile-first layout. If a parent cannot find something in a few taps, they will call the office instead.'] },
      { heading: 'The features that matter most', paragraphs: ['Live grades, attendance alerts, fee statements and receipts, school announcements, and direct messaging with teachers cover the essentials parents ask about most.'] },
      { heading: 'Privacy and security', paragraphs: ['Parents should only see their own children. Role-based access, secure login, and audit logs protect student data and meet school policy requirements.'] },
      { heading: 'Rollout that sticks', paragraphs: ["Launch with a short onboarding video and a simple help page. Highlight one benefit at a time — for example, 'see this week\\'s attendance' — and adoption grows naturally."] },
    ],
  },
  {
    slug: 'securing-patient-data',
    img: post6,
    category: 'Web Chatting',
    title: 'Online website chatting platforms are the future of customer support',
    excerpt: 'Customers expect instant answers. Here is how a well-designed online chatting platform improves engagement and reduces calls to the office.',
    author: 'DanTech Team',
    date: 'Dec 6, 2024',
    readTime: '7 min read',
    content: [
      { heading: 'Least-privilege access', paragraphs: ['Only give staff access to the data they need. Receptionists do not need to see billing history, and nurses do not need to edit patient contact info.'] },
      { heading: 'Encryption everywhere', paragraphs: ['Use HTTPS for all web traffic, encrypt databases at rest, and ensure backups are encrypted. Patient data should never be stored in plain text.'] },
      { heading: 'Audit logs and monitoring', paragraphs: ['Keep detailed logs of who accessed what and when. Monitor for unusual activity, such as repeated failed logins or large data exports.'] },
      { heading: 'Strong authentication', paragraphs: ['Require strong passwords, enable multi-factor authentication for admin accounts, and lock out repeated failed logins.'] },
      { heading: 'Backups and disaster recovery', paragraphs: ['Automate daily encrypted backups, test restores regularly, and document a clear recovery plan. Ransomware and hardware failure should never wipe patient history.'] },
    ],
  },
]

export default function Blog() {
  const dark = useTheme()
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedSlug, setSelectedSlug] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [selectedSlug])

  const selectedPost = articles.find((a) => a.slug === selectedSlug)

  /* ---------- theme-aware classes ---------- */
  const page = dark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
  const sectionAlt = dark ? 'bg-[#0a0a0a]' : 'bg-white'
  const border = dark ? 'border-[#D4AF37]/20' : 'border-[#D4AF37]/30'
  const heading = dark ? 'text-white' : 'text-gray-900'
  const body = dark ? 'text-gray-300' : 'text-gray-700'
  const muted = dark ? 'text-gray-400' : 'text-gray-500'
  const soft = dark ? 'text-gray-500' : 'text-gray-500'
  const gold = dark ? 'text-[#F5D76E]' : 'text-[#8a6d1f]'
  const goldSoft = dark ? 'text-[#D4AF37]/70' : 'text-[#8a6d1f]/80'
  const cardBg = dark ? 'bg-black' : 'bg-white'
  const cardBorder = dark ? 'border-[#D4AF37]/25' : 'border-[#D4AF37]/30'
  const shadowHover = dark ? 'hover:shadow-[#D4AF37]/10' : 'hover:shadow-gray-200'
  const pillActive = 'border-[#D4AF37] bg-[#D4AF37] text-black'
  const pillIdle = dark
    ? 'border-[#D4AF37]/30 text-gray-300 hover:border-[#D4AF37]/60 hover:text-[#F5D76E]'
    : 'border-[#D4AF37]/40 text-gray-700 hover:border-[#D4AF37] hover:text-[#8a6d1f]'
  const inputClass = dark
    ? 'border-[#D4AF37]/30 bg-black text-white placeholder-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]/30'
    : 'border-[#D4AF37]/40 bg-white text-gray-900 placeholder-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]/30'

  /* ============================================================
     DETAIL VIEW
     ============================================================ */
  if (selectedPost) {
    const related = articles.filter((a) => a.slug !== selectedPost.slug && a.category === selectedPost.category).slice(0, 3)
    const fallback = articles.filter((a) => a.slug !== selectedPost.slug).slice(0, 3)
    const relatedPosts = related.length > 0 ? related : fallback

    return (
      <main className={`min-h-screen transition-colors ${page}`}>
        {/* HERO */}
        <section className="relative w-full overflow-hidden">
          <img
            src={selectedPost.img}
            alt={selectedPost.title}
            draggable={false}
            className="h-[55vh] min-h-[380px] w-full object-cover sm:h-[65vh]"
          />
          <div className={`absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 ${dark ? 'to-black' : 'to-black/95'}`} />

          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-4xl flex-col justify-end px-4 pb-10 sm:px-6 lg:px-8">
              <Reveal direction="right" delay={0}>
                <button
                  type="button"
                  onClick={() => setSelectedSlug(null)}
                  className="mb-4 inline-flex w-fit items-center gap-2 text-sm font-medium text-[#F5D76E] hover:underline"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M11 6l-6 6 6 6" />
                  </svg>
                  Back to blog
                </button>
              </Reveal>

              <Reveal direction="right" delay={100}>
                <span className="inline-block w-fit rounded-full border border-[#D4AF37]/50 bg-black/50 px-3 py-1 text-xs font-semibold tracking-wider text-[#F5D76E] backdrop-blur-sm">
                  {selectedPost.category}
                </span>
              </Reveal>

              <Reveal direction="right" delay={200}>
                <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {selectedPost.title}
                </h1>
              </Reveal>

              <Reveal direction="right" delay={300}>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-300">
                  <span className="font-medium text-white">{selectedPost.author}</span>
                  <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
                  <span>{selectedPost.date}</span>
                  <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
                  <span>{selectedPost.readTime}</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ARTICLE BODY */}
        <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <p className={`text-lg leading-relaxed ${dark ? 'text-gray-200' : 'text-gray-700'}`}>{selectedPost.excerpt}</p>
          </Reveal>

          <div className="mt-10 space-y-10">
            {selectedPost.content.map((block, idx) => (
              <Reveal key={block.heading} direction={idx % 2 === 0 ? 'left' : 'right'} delay={60}>
                <section>
                  <h2 className={`text-2xl font-bold sm:text-3xl ${gold}`}>{block.heading}</h2>
                  {block.paragraphs.map((para, i) => (
                    <p key={i} className={`mt-4 text-base leading-relaxed ${body}`}>{para}</p>
                  ))}
                </section>
              </Reveal>
            ))}
          </div>

          {/* SHARE */}
          <Reveal direction="up" delay={60}>
            <div className={`mt-12 flex flex-wrap items-center gap-3 border-t pt-8 ${border}`}>
              <span className={`text-sm font-medium ${muted}`}>Share:</span>
              {[
                { name: 'Twitter / X', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedPost.title)}` },
                { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}` },
                { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}` },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-[#D4AF37]/10 ${dark ? 'border-[#D4AF37]/40 text-[#F5D76E]' : 'border-[#8a6d1f]/40 text-[#8a6d1f]'}`}
                >
                  {s.name}
                </a>
              ))}
            </div>
          </Reveal>

          {/* AUTHOR */}
          <Reveal direction="zoom" delay={100}>
            <div className={`mt-10 flex items-center gap-4 rounded-2xl border p-5 ${cardBg} ${cardBorder}`}>
              <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#D4AF37]/50 text-lg font-bold ${dark ? 'bg-black' : 'bg-gray-50'} ${gold}`}>
                D
              </div>
              <div>
                <div className={`font-semibold ${gold}`}>{selectedPost.author}</div>
                <div className={`text-sm ${muted}`}>Software developers & problem solvers at DanTech.</div>
              </div>
            </div>
          </Reveal>
        </article>

        {/* RELATED */}
        <section className={`border-t ${border} ${sectionAlt} py-16`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal direction="up">
              <h2 className={`text-2xl font-bold tracking-tight sm:text-3xl ${heading}`}>
                Related <span className={gold}>articles</span>
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((p, i) => (
                <Reveal key={p.slug} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 120}>
                  <button
                    type="button"
                    onClick={() => setSelectedSlug(p.slug)}
                    className={`group flex flex-col overflow-hidden rounded-2xl border text-left transition hover:border-[#D4AF37]/60 hover:shadow-lg ${cardBg} ${cardBorder} ${shadowHover}`}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.title}
                        draggable={false}
                        className="pointer-events-none h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                      <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-[#D4AF37]/40 bg-black/70 px-3 py-1 text-xs font-medium text-[#F5D76E]">
                        {p.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className={`text-base font-semibold leading-snug transition group-hover:text-[#D4AF37] ${heading}`}>
                        {p.title}
                      </h3>
                      <div className={`mt-3 flex items-center gap-2 text-xs ${soft}`}>
                        <span>{p.date}</span>
                        <span className="h-1 w-1 rounded-full bg-[#D4AF37]/60" />
                        <span>{p.readTime}</span>
                      </div>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal direction="zoom">
            <div className={`relative overflow-hidden rounded-3xl border px-6 py-14 text-center sm:px-12 ${cardBorder} ${sectionAlt}`}>
              <div className={`pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl ${dark ? 'bg-[#D4AF37]/20' : 'bg-[#D4AF37]/10'}`} />
              <h2 className={`relative text-3xl font-bold tracking-tight sm:text-4xl ${heading}`}>
                Have a project in <span className={gold}>mind</span>?
              </h2>
              <p className={`relative mx-auto mt-4 max-w-xl ${body}`}>
                Let's turn your idea into a product your users love. Get in touch with DanTech today.
              </p>
              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="/contact"
                  className="rounded-lg bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black shadow-md shadow-[#D4AF37]/30 transition hover:-translate-y-0.5 hover:bg-[#F5D76E]"
                >
                  Contact us
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedSlug(null)}
                  className={`rounded-lg border px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-[#D4AF37]/10 ${dark ? 'border-[#D4AF37]/60 text-[#F5D76E]' : 'border-[#8a6d1f]/60 text-[#8a6d1f]'}`}
                >
                  More articles
                </button>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    )
  }

  /* ============================================================
     LIST VIEW
     ============================================================ */
  const featured = articles.find((a) => a.featured) || articles[0]
  const gridPosts = articles.filter((a) => a.slug !== featured.slug)
  const filteredPosts =
    activeCategory === 'All' ? gridPosts : gridPosts.filter((p) => p.category === activeCategory)

  return (
    <>
      <main className={`min-h-screen transition-colors ${page}`}>
        {/* HERO */}
        <section className="relative w-full overflow-hidden">
          <img
            src={featured.img}
            alt="DanTech blog"
            draggable={false}
            className="pointer-events-none h-[45vh] min-h-[320px] w-full object-cover sm:h-[55vh]"
          />
          <div className={`absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 ${dark ? 'to-black/95' : 'to-black'}`} />
          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
              <Reveal direction="right" delay={0}>
                <span className="inline-block w-fit rounded-full border border-[#D4AF37]/50 bg-black/40 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#F5D76E] backdrop-blur-sm">
                  DANTECH BLOG
                </span>
              </Reveal>
              <Reveal direction="right" delay={150}>
                <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Insights on <span className="text-[#F5D76E]">software</span> that works.
                </h1>
              </Reveal>
              <Reveal direction="right" delay={300}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-200 sm:text-lg">
                  Practical articles on school ERP, healthcare software, business systems, e-commerce, and modern web development — written by the DanTech team.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FEATURED */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal direction="zoom">
            <button
              type="button"
              onClick={() => setSelectedSlug(featured.slug)}
              className={`group grid w-full overflow-hidden rounded-3xl border text-left transition hover:border-[#D4AF37]/60 hover:shadow-xl lg:grid-cols-2 ${sectionAlt} ${cardBorder}`}
            >
              <div className="relative aspect-video overflow-hidden lg:aspect-auto">
                <img
                  src={featured.img}
                  alt={featured.title}
                  draggable={false}
                  className="pointer-events-none h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-[#D4AF37]/40 bg-black/70 px-3 py-1 text-xs font-medium text-[#F5D76E]">
                  Featured
                </span>
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-10">
                <span className={`text-xs font-semibold uppercase tracking-wider ${goldSoft}`}>{featured.category}</span>
                <h2 className={`mt-3 text-2xl font-bold leading-tight transition group-hover:text-[#D4AF37] sm:text-3xl ${heading}`}>
                  {featured.title}
                </h2>
                <p className={`mt-4 text-sm leading-relaxed sm:text-base ${body}`}>{featured.excerpt}</p>
                <div className={`mt-6 flex flex-wrap items-center gap-3 text-xs ${muted}`}>
                  <span className={`font-medium ${body}`}>{featured.author}</span>
                  <span className="h-1 w-1 rounded-full bg-[#D4AF37]/60" />
                  <span>{featured.date}</span>
                  <span className="h-1 w-1 rounded-full bg-[#D4AF37]/60" />
                  <span>{featured.readTime}</span>
                </div>
                <span className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${gold}`}>
                  Read article
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </button>
          </Reveal>
        </section>

        {/* FILTER */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, i) => (
                <Reveal key={cat} direction="zoom" delay={i * 60}>
                  <button
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${activeCategory === cat ? pillActive : pillIdle}`}
                  >
                    {cat}
                  </button>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </section>

        {/* GRID */}
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <Reveal direction="zoom">
              <div className={`rounded-2xl border p-12 text-center ${cardBg} ${cardBorder}`}>
                <p className={body}>No articles in this category yet.</p>
              </div>
            </Reveal>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((p, i) => {
                const dirs = ['left', 'zoom', 'right', 'right', 'zoom', 'left']
                return (
                  <Reveal key={p.slug} direction={dirs[i % dirs.length]} delay={i * 90}>
                    <button
                      type="button"
                      onClick={() => setSelectedSlug(p.slug)}
                      className={`group flex h-full w-full flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:shadow-xl ${cardBg} ${cardBorder} ${shadowHover}`}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={p.img}
                          alt={p.title}
                          draggable={false}
                          className="pointer-events-none h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        />
                        <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-[#D4AF37]/40 bg-black/70 px-3 py-1 text-xs font-medium text-[#F5D76E]">
                          {p.category}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <h3 className={`text-lg font-semibold leading-snug transition group-hover:text-[#D4AF37] ${heading}`}>{p.title}</h3>
                        <p className={`mt-2 line-clamp-3 text-sm leading-relaxed ${muted}`}>{p.excerpt}</p>
                        <div className={`mt-auto flex flex-wrap items-center gap-2 pt-4 text-xs ${soft}`}>
                          <span className={`font-medium ${muted}`}>{p.author}</span>
                          <span className="h-1 w-1 rounded-full bg-[#D4AF37]/60" />
                          <span>{p.date}</span>
                          <span className="h-1 w-1 rounded-full bg-[#D4AF37]/60" />
                          <span>{p.readTime}</span>
                        </div>
                      </div>
                    </button>
                  </Reveal>
                )
              })}
            </div>
          )}
        </section>

        {/* NEWSLETTER */}
        <section className={`border-t ${border} ${sectionAlt} py-20`}>
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <Reveal direction="up">
              <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${heading}`}>
                Stay in the <span className={gold}>loop</span>
              </h2>
              <p className={`mt-4 ${body}`}>
                Get new articles on school ERP, HMS, BMS, e-commerce, and web development — straight to your inbox.
              </p>
            </Reveal>

            <Reveal direction="up" delay={150}>
              <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${inputClass}`}
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-lg bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black shadow-md shadow-[#D4AF37]/30 transition hover:-translate-y-0.5 hover:bg-[#F5D76E]"
                >
                  Subscribe
                </button>
              </form>
              <p className={`mt-3 text-xs ${soft}`}>No spam. Unsubscribe anytime.</p>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal direction="zoom">
            <div className={`relative overflow-hidden rounded-3xl border px-6 py-14 text-center sm:px-12 ${cardBorder} ${sectionAlt}`}>
              <div className={`pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl ${dark ? 'bg-[#D4AF37]/20' : 'bg-[#D4AF37]/10'}`} />
              <h2 className={`relative text-3xl font-bold tracking-tight sm:text-4xl ${heading}`}>
                Have a project in <span className={gold}>mind</span>?
              </h2>
              <p className={`relative mx-auto mt-4 max-w-xl ${body}`}>
                Let's turn your idea into a product your users love. Get in touch with DanTech today.
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
                  className={`rounded-lg border px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-[#D4AF37]/10 ${dark ? 'border-[#D4AF37]/60 text-[#F5D76E]' : 'border-[#8a6d1f]/60 text-[#8a6d1f]'}`}
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