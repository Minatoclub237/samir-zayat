import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Scroll fluide vers une ancre, via Lenis si actif. */
export function scrollToHash(href: string) {
  const el = document.querySelector(href)
  if (!el) return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenis = (window as any).__lenis
  if (lenis) lenis.scrollTo(el)
  else el.scrollIntoView({ behavior: 'smooth' })
}
