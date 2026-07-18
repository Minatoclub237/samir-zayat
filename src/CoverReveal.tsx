import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Fige son contenu quand son bas atteint le bas du viewport,
 * pour que la section suivante (en position relative + z-10) le recouvre.
 */
export function StickyUnder({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [top, setTop] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setTop(Math.min(0, window.innerHeight - el.offsetHeight))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <div ref={ref} className="sticky z-0" style={{ top }}>
      {children}
    </div>
  )
}
