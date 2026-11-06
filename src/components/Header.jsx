import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.jpg'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
]
 
const SunIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="4" />
    <path strokeLinecap="round" d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4l1.4-1.4" />
  </svg>
)

const MoonIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
  </svg>
)

const SearchIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
  </svg>
)
   
export default function Header() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return true
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    // 🔔 notify every other component on the page
    window.dispatchEvent(new Event('theme-change'))
  }, [dark])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) window.location.href = `/search?q=${encodeURIComponent(query.trim())}`
  }

  const shell = dark ? 'border-[#D4AF37]/30 bg-black text-[#D4AF37]' : 'border-[#D4AF37]/40 bg-white text-gray-900'
  const brandText = dark ? 'text-[#D4AF37]' : 'text-gray-900'
  const navActive = dark ? 'text-[#F5D76E]' : 'text-[#8a6d1f]'
  const navIdle = dark ? 'text-[#D4AF37]/70 hover:text-[#F5D76E]' : 'text-gray-600 hover:text-[#8a6d1f]'
  const inputClass = dark
    ? 'border-[#D4AF37]/40 bg-[#1a1a1a] text-[#F5D76E] placeholder-[#D4AF37]/50 focus:border-[#D4AF37] focus:ring-[#D4AF37]/30'
    : 'border-[#D4AF37]/40 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]/30'
  const iconBtn = dark
    ? 'border-[#D4AF37]/40 text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10'
    : 'border-[#D4AF37]/50 text-[#8a6d1f] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10'
  const signIn = dark
    ? 'border-[#D4AF37]/50 text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10'
    : 'border-[#8a6d1f]/50 text-[#8a6d1f] hover:border-[#8a6d1f] hover:bg-[#D4AF37]/10'
  const getStarted = 'bg-[#D4AF37] text-black hover:bg-[#F5D76E] shadow-md shadow-[#D4AF37]/30 hover:shadow-lg'
  const sidebarShell = dark ? 'bg-black text-[#D4AF37] border-[#D4AF37]/30' : 'bg-white text-gray-900 border-[#D4AF37]/40'
  const sidebarDivider = dark ? 'border-[#D4AF37]/20' : 'border-[#D4AF37]/30'

  return (
    <>
      <header className={`sticky top-0 z-40 w-full border-b ${shell} shadow-[0_2px_20px_rgba(212,175,55,0.15)] transition-colors`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-2.5">
            <img src={logo} alt="Logo" className="h-16 w-16 rounded-full border-2 border-[#D4AF37] object-cover" />
            <span className={`text-xl font-bold tracking-tight ${brandText}`}>
              Dan<span className="text-[#F5D76E]">Tech</span>
            </span>
          </a>
          <div className="locla name of this name of this name for class name if then but more thing for this locala thie name if this name if then but more thin"></div>

          <nav className="ml-8 hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setActive(l.href)}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors
                  ${active === l.href ? navActive : navIdle}
                  after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-[#D4AF37] after:transition-transform
                  ${active === l.href ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <form onSubmit={handleSearch} className="ml-auto hidden max-w-xs flex-1 md:block">
            <div className="relative">
              <span className={`pointer-events-none absolute inset-y-0 left-3 flex items-center ${dark ? 'text-[#D4AF37]/60' : 'text-gray-500'}`}>
                <SearchIcon />
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className={`w-full rounded-full border py-2 pl-10 pr-4 text-sm outline-none transition focus:ring-2 ${inputClass}`}
              />
            </div>
          </form>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <button
              onClick={() => setDark(!dark)}
              aria-label="Toggle color theme"
              className={`rounded-full border p-2 transition ${iconBtn}`}
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>

            <a href="/login" className={`hidden rounded-lg border px-4 py-2 text-sm font-medium transition sm:block ${signIn}`}>
              Sign in
            </a>
            <a href="/contact" className={`hidden rounded-lg px-4 py-2 text-sm font-semibold transition sm:block ${getStarted}`}>
              Get started
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className={`rounded-lg p-2 transition lg:hidden ${dark ? 'text-[#D4AF37] hover:bg-[#D4AF37]/10' : 'text-gray-800 hover:bg-gray-100'}`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                {menuOpen ? <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /> : <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 lg:hidden ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      />

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 border-l ${sidebarShell} shadow-2xl transform transition-transform duration-300 ease-out lg:hidden flex flex-col ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className={`flex items-center justify-between h-16 px-5 border-b ${sidebarDivider}`}>
          <span className="text-lg font-bold">Menu</span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className={`rounded-lg p-2 transition ${dark ? 'text-[#D4AF37] hover:bg-[#D4AF37]/10' : 'text-gray-800 hover:bg-gray-100'}`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSearch} className={`px-4 pt-4 pb-2 border-b ${sidebarDivider}`}>
          <div className="relative">
            <span className={`pointer-events-none absolute inset-y-0 left-3 flex items-center ${dark ? 'text-[#D4AF37]/60' : 'text-gray-500'}`}>
              <SearchIcon />
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className={`w-full rounded-full border py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 ${inputClass}`}
            />
          </div>
        </form>

        <nav className="flex flex-col gap-1 p-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => { setActive(l.href); setMenuOpen(false) }}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                active === l.href
                  ? dark ? 'bg-[#D4AF37]/15 text-[#F5D76E]' : 'bg-[#D4AF37]/15 text-[#8a6d1f]'
                  : dark ? 'text-[#D4AF37]/80 hover:bg-[#D4AF37]/10 hover:text-[#F5D76E]' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
   <div className="local name this name of this name is this name if this name for this name this name this this name if this name if then for this name id for personale get this name for then optional for they take but more think over it for learn "></div>
        <div className={`mt-auto p-4 border-t ${sidebarDivider} space-y-2`}>
          <a href="/login" onClick={() => setMenuOpen(false)} className={`block w-full rounded-lg border py-2.5 text-center text-sm font-medium transition ${signIn}`}>
            Sign in
          </a>
          <a href="/contact" onClick={() => setMenuOpen(false)} className={`block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition ${getStarted}`}>
            Get started
          </a>
        </div>
      </aside>
    </>
  )
}