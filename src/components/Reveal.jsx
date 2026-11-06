import React, { useEffect, useRef, useState } from 'react'

/**
 * Scroll-reveal wrapper.
 * direction: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'rotate'
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  as: Tag = 'div',
}) {
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