import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/instrument-serif/400-italic.css'
import './index.css'
import Lenis from 'lenis'
import HeroSection from './HeroSection'
import ReviewsSection from './ReviewsSection'
import ScrollCinemaSection from './ScrollCinemaSection'
import CabinetSection from './CabinetSection'
import FaqSection from './FaqSection'
import ContactSection from './ContactSection'
import Footer from './Footer'
import { StickyUnder } from './CoverReveal'

// Smooth scroll (desktop uniquement, comme la maquette)
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
  window.innerWidth < 768
if (!isMobile) {
  const lenis = new Lenis({
    autoRaf: true,
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any).__lenis = lenis
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroSection />
    <ReviewsSection />
    <ScrollCinemaSection />
    <StickyUnder>
      <CabinetSection />
    </StickyUnder>
    <div className="relative z-10 overflow-hidden rounded-t-[2.5rem] border-t border-white/10 bg-black shadow-[0_-40px_120px_rgba(0,0,0,0.9)]">
      <FaqSection />
      <ContactSection />
      <Footer />
    </div>
  </StrictMode>,
)
