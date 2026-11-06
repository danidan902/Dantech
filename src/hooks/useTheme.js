import { useEffect, useState } from 'react'

export function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return true
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // apply on mount + whenever it changes elsewhere
    const read = () => {
      const saved = localStorage.getItem('theme')
      const next = saved ? saved === 'dark' : true
      setDark(next)
      document.documentElement.classList.toggle('dark', next)
    }

    read()
    window.addEventListener('storage', read)
    window.addEventListener('theme-change', read)
    return () => {
      window.removeEventListener('storage', read)
      window.removeEventListener('theme-change', read)
    }
  }, [])

  return dark
}